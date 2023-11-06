import * as Yup  from 'yup'


export const cloudinaryFormValidationSchema = Yup.object({
    cloudName: Yup.string().required('Requerido') ,
    uploadPreset: Yup.string().required('Requerido'),
    folder: Yup.string().required('Requerido'),
    apiKey: Yup.string().required('Requerido'),
    format: Yup.string().required('Requerido')
  })