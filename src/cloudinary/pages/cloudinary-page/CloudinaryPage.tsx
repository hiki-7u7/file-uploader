import { useEffect } from 'react';
import { Formik } from 'formik';


import { useAppDispatch, useAppSelector } from '@/cloudinary/store/hook';
import { setUploadedFiles } from '@/cloudinary/store/cloudinary/cloudinarySlice';
import { CloudinaryForm, PreviewImages, UploadHistory } from '@/cloudinary/components';
import { cloudinaryFormValidationSchema } from '@/cloudinary/validations';
import { uploadFilesThunk } from '@/cloudinary/store/cloudinary/thunks';
import cloudinaryPageStyles from './cloudinary-page.module.css';



export const CloudinaryPage = () => {
  
  const {uploadedFiles} = useAppSelector( state => state.cloudinary );
  const dispatch = useAppDispatch();

  //* DUPLICACION
  //? la duplicacion solo pasa por el <StrictMode /> hacer que los efectos se hagan 2 veces
  //? en la primera ves agrega los dos primmeros files y en la segunda tambien, poreso quedan 4
  useEffect( () => {
    if(!localStorage.getItem('uploadedFiles')) return;
    if(uploadedFiles.length <= 0){
      const uploadsFromLs = JSON.parse(localStorage.getItem('uploadedFiles')!)
      dispatch( setUploadedFiles(uploadsFromLs))
    }
  },[dispatch,uploadedFiles])

  return (
    <div className={cloudinaryPageStyles['container-page']}>

      <div className={cloudinaryPageStyles['grid-item']}>

        <Formik
          initialValues={{
            cloudName: '',
            uploadPreset: '',
            folder: '',
            apiKey: '',
            format: ''
          }}
          onSubmit={ (values) => {
            dispatch(uploadFilesThunk(values))
          }}
          validationSchema={cloudinaryFormValidationSchema}
        >
          { (formik) => (
              <CloudinaryForm formik={formik}/>
          ) }
        </Formik>

      </div>

      <div className={cloudinaryPageStyles['grid-item']}>
        <PreviewImages />
      </div>

      <div className={cloudinaryPageStyles['grid-item']}>
        <UploadHistory />
      </div>

    </div>
  )
}
