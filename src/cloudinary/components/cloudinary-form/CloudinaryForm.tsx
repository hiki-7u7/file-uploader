import { useEffect, useState } from 'react';
import { Form, FormikProps } from 'formik';
import { v4 as uuid } from 'uuid';

import { Button, CheckBox, InputField, InputFile, Select } from '@/common/components';
import { convertToBase64 } from '@/common/helpers';
import { ConfigFields, SerializableFile } from '@/cloudinary/interfaces';
import { setImagePreviews } from '@/cloudinary/store/cloudinary/cloudinarySlice';
import { useAppDispatch } from '@/cloudinary/store/hook';

import cloudinaryFormStyles from './cloudinary-form.module.css'


interface Props {
  formik: FormikProps<ConfigFields>
}

//? cuando fijate como estas guardo los ultimos cambios en el segundo useEffect

export const CloudinaryForm = ( { formik }:Props ) => {

  const [saveChanges, setSaveChanges] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { setValues, values } = formik;

  useEffect( () => {
    if(!localStorage.getItem('fieldValuesCd')) return;
    setSaveChanges(true);
    setValues( JSON.parse(localStorage.getItem('fieldValuesCd')!) )
  },[setValues])
  
  useEffect(()=>{
    if( saveChanges ){
      localStorage.setItem('fieldValuesCd', JSON.stringify({...values}))
    }else {
      localStorage.removeItem('fieldValuesCd')
    }
  },[saveChanges,values])

  const handleFileChange = async ( event: React.ChangeEvent<HTMLInputElement> ) => {
    
    if(!event.target.files) return;

    const serializedFiles: SerializableFile[] = []

    for (const file of event.target.files) {
      const serializedFile: SerializableFile = {
        id: uuid(),
        imageBase64: await convertToBase64(file),
        name: file.name,
        size: file.size,
        type: file.type
      }
      serializedFiles.push(serializedFile)
    }

    dispatch( setImagePreviews(serializedFiles) )
    event.target.value = '';

  };


  return (
    <div className={cloudinaryFormStyles.container}>
      <h2>Upload to Cloudinary</h2>
      <Form>

          <InputField 
            label="Cloud name"
            type="text" 
            id="cloud-name" 
            name="cloudName"
            placeholder="Cloud name"
          />

          <InputField 
            label="Upload preset"
            type="text" 
            id="upload-preset" 
            name="uploadPreset"
            placeholder="Upload preset"
            mt={20}
          />

          <InputField
            label="Folder"
            type="text"
            id="folder"
            name="folder"
            placeholder="Folder"
            mt={20}
          />

          <InputField
            label="Api key"
            type="text"
            id="api-key"
            name="apiKey"
            placeholder="Api key"
            mt={20}
          />

          <Select
            mt={20}
            name="format" 
            id="select-format" 
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
            onChange={(e) => setSaveChanges(e.target.checked)}
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
      </Form>
    </div>
  )
}
















// import { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import { v4 as uuid } from 'uuid';

// import { Button, CheckBox, InputField, InputFile, Select } from '@/common/components';
// import { convertToBase64 } from '@/common/helpers';
// import { SerializableFile } from '@/cloudinary/interfaces';
// import { setImagePreviews } from '@/cloudinary/store/cloudinary/cloudinarySlice';
// import { useAppDispatch } from '@/cloudinary/store/hook';
// import { cloudinaryFormValidationSchema } from '@/cloudinary/validations';
// import { uploadFilesThunk } from '@/cloudinary/store/cloudinary/thunks';

// import cloudinaryFormStyles from './cloudinary-form.module.css'

// //TODO as eso de abstraccion
// //TODO el save esta bien, pero tambien as que su effect se ejecute cuando alguien suba algo

// export const CloudinaryForm = () => {

//   const [saveChanges, setSaveChanges] = useState<boolean>(false);
//   const dispatch = useAppDispatch();
//   const { handleChange, values, handleSubmit, errors, touched, handleBlur, setValues } = useFormik({
//     initialValues: {
//       cloudName: '',
//       uploadPreset: '',
//       folder: '',
//       apiKey: '',
//       format: '',
//     },
//     onSubmit: async ( values ) => {
//       dispatch(uploadFilesThunk(values))
//     },
//     validationSchema: cloudinaryFormValidationSchema
//   })

  
//   useEffect( () => {
//     if(!localStorage.getItem('fieldValuesCd')) return;
//     setSaveChanges(true);
//     setValues( JSON.parse(localStorage.getItem('fieldValuesCd')!) )
//   },[setValues])
  
//   useEffect(()=>{
//     if( saveChanges ){
//       localStorage.setItem('fieldValuesCd', JSON.stringify({...values}))
//     }else {
//       localStorage.removeItem('fieldValuesCd')
//     }
//   },[saveChanges,values])

//   const handleFileChange = async ( event: React.ChangeEvent<HTMLInputElement> ) => {
    
//     if(!event.target.files) return;

//     const serializedFiles: SerializableFile[] = []

//     for (const file of event.target.files) {
//       const serializedFile: SerializableFile = {
//         id: uuid(),
//         imageBase64: await convertToBase64(file),
//         name: file.name,
//         size: file.size,
//         type: file.type
//       }
//       serializedFiles.push(serializedFile)
//     }

//     dispatch( setImagePreviews(serializedFiles) )
//     event.target.value = '';

//   };


//   return (
//     <div className={cloudinaryFormStyles.container}>
//       <h2>Upload to Cloudinary</h2>
//       <form onSubmit={handleSubmit} noValidate>

//           <InputField 
//             label="Cloud name"
//             type="text" 
//             id="cloud-name" 
//             name="cloudName" 
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.cloudName}
//             touched={touched.cloudName}
//             errors={errors.cloudName}
//           />

//           <InputField 
//             label="Upload preset"
//             type="text" 
//             id="upload-preset" 
//             name="uploadPreset" 
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.uploadPreset}
//             touched={touched.uploadPreset}
//             errors={errors.uploadPreset}
//             mt={20}
//           />

//           <InputField
//             label="Folder"
//             type="text"
//             id="folder"
//             name="folder" 
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.folder}
//             touched={touched.folder}
//             errors={errors.folder}
//             mt={20}
//           />

//           <InputField
//             label="Api key"
//             type="text" 
//             id="api-key" 
//             name="apiKey" 
//             onChange={handleChange}
//             onBlur={handleBlur} 
//             value={values.apiKey}
//             touched={touched.apiKey}
//             errors={errors.apiKey}
//             mt={20}
//           />

//           <Select
//             mt={20}
//             name="format" 
//             id="select-format" 
//             value={values.format} 
//             onChange={handleChange}
//           >
//               <option value="" selected>Seleccione un formato</option>
//               <option value="image">Image</option>
//               <option value="video">Video</option>
//           </Select>
//           { touched.format && errors.format && <span>{ errors.format }</span> }

//           <InputFile 
//             id="file" 
//             multiple 
//             name="file"
//             onChange={handleFileChange}
//             mt={20}
//           />
          
//           <CheckBox
//             onChange={(e) => setSaveChanges(e.target.checked)}
//             checked={saveChanges}
//             label="Mantener cambios"
//             id="check-box"
//             name="checkbox"
//             mt={20}
//           />

//           <Button
//             mt={20}
//             type="submit" 
//             label="Upload files" 
//             icon={<i className="fa-solid fa-cloud-arrow-up"/>}
//           />
//       </form>
//     </div>
//   )
// }
