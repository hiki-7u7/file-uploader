import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';

import { uploadFiles } from '@/cloudinary/helpers';
import { ConfigFields, SerializableFile } from '@/cloudinary/interfaces'
import { useAppDispatch, useAppSelector } from '@/cloudinary/store/hook';
import { InputField, Select, InputFile, CheckBox, Button } from '@/common/components';
import { setImagePreviews, setIsUploading, setUploadedFiles } from '@/cloudinary/store/cloudinary/cloudinarySlice';
import { convertToBase64 } from '@/common/helpers';
import fileUploadFormToCloudinaryStyles from './file-upload-form-to-cloudinary.module.css'


//!URGENTE
//TODO funciona pero todo esta horrible, arregla el codigo sobre todo la parte del submit (70%)

export const FileUploadFormToCloudinary = () => {
  
  const [fieldValues, setFieldValues] = useState<ConfigFields>({
    cloudName: '',
    uploadPreset: '',
    folder: '',
    apiKey: '',
    format: ''
  });

  const [saveChanges, setSaveChanges] = useState<boolean>(false);

  const { imagePreviews, uploadedFiles } = useAppSelector((state) => state.cloudinary);
  const dispatch = useAppDispatch();

  useEffect( () => {
    if(!localStorage.getItem('fieldValuesCd')) return;
    setSaveChanges(true);
    setFieldValues( JSON.parse(localStorage.getItem('fieldValuesCd')!) )
  },[])

  const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    dispatch( setIsUploading(true) );
    try {
      const filesUploaded = await uploadFiles({...fieldValues, files: imagePreviews });

      dispatch( setIsUploading(false) );
      dispatch( setImagePreviews([]) );
      dispatch( setUploadedFiles(filesUploaded) )
      toast.success('Archivos subidos correctamente',{
        position: 'top-center'
      })
      localStorage.setItem('uploadedFiles', JSON.stringify([...filesUploaded, ...uploadedFiles].splice(0,25)))
    } catch (error) {
      toast.error('Error al subir archivos',{
        position: 'top-center'
      })
      dispatch( setIsUploading(false) );
    }
    
    if( saveChanges ){
      localStorage.setItem('fieldValuesCd', JSON.stringify({...fieldValues}) )
    }else {
      localStorage.removeItem('fieldValuesCd')
    }

  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFieldValues({
      ...fieldValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = async ( event: React.ChangeEvent<HTMLInputElement> ) => {
    
    if(!event.target.files) return;

    const files: SerializableFile[] = []

    for (const file of event.target.files) {
      const fileObj: SerializableFile = {
        id: uuid(),
        imageBase64: await convertToBase64(file),
        name: file.name,
        size: file.size,
        type: file.type
      }
      files.push(fileObj)
    }

    dispatch( setImagePreviews(files) )
    event.target.value = ''; //* IMPORTANTE enseñale a la Ariadna

  };

  const handleCheckboxChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setSaveChanges(event.target.checked);
  }

  return (
    <div className={fileUploadFormToCloudinaryStyles.container}>
      <h2>Upload to Cloudinary</h2>
      <form onSubmit={handleSubmit}>
        <InputField
            label="Cloud name"
            type="text" 
            id="cloud-name" 
            name="cloudName" 
            onChange={handleChange} 
            value={fieldValues.cloudName}
          />

          <InputField
            label="Upload preset"
            type="text" 
            id="upload-preset" 
            name="uploadPreset" 
            onChange={handleChange} 
            value={fieldValues.uploadPreset}
            mt={20}
          />

          <InputField
            label="Folder"
            type="text"
            id="folder"
            name="folder" 
            onChange={handleChange} 
            value={fieldValues.folder}
            mt={20}
          />

          <InputField
            label="Api key"
            type="text" 
            id="api-key" 
            name="apiKey" 
            onChange={handleChange} 
            value={fieldValues.apiKey}
            mt={20}
          />

          <Select
            mt={20}
            name="format" 
            id="select-format" 
            value={fieldValues.format} 
            onChange={handleChange}
          >
              <option value="" selected>Seleccione un formato</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
          </Select>

          <InputFile 
            id="file" 
            multiple 
            name="file"
            onChange={handleFileChange}
            mt={20}
          />


          <CheckBox
            onChange={handleCheckboxChange}
            checked={saveChanges}
            label="Mantener cambios"
            id="check-box"
            name="checkbox"
            mt={20}
          />

          <Button
            mt={20}
            type="submit" 
            label="Upload files" 
            icon={<i className="fa-solid fa-cloud-arrow-up"/>}
          />

      </form>
    </div>
    
  )
}
