import toast from 'react-hot-toast';

import { uploadFiles } from '@/cloudinary/helpers';
import { setImagePreviews, setIsUploading, setUploadedFiles } from './cloudinarySlice';
import { ConfigFields } from '@/cloudinary/interfaces';
import { AppDispatch, RootState } from '../store';

//* el error tiene el any porque no encontre como tiparlo xd

export const uploadFilesThunk = (values:ConfigFields ) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const {cloudinary} = getState()

        dispatch( setIsUploading(true) );

        try {
            const filesUploaded = await uploadFiles({...values, files: cloudinary.imagePreviews });
    
            dispatch( setIsUploading(false) );
            dispatch( setImagePreviews([]) );
            dispatch( setUploadedFiles(filesUploaded) )
            toast.success('Archivos subidos correctamente',{
                position: 'top-center'
            })
            localStorage.setItem('uploadedFiles', JSON.stringify([...filesUploaded, ...cloudinary.uploadedFiles].splice(0,25)))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error(error.message,{
                position: 'top-center'
            })
            dispatch( setIsUploading(false) );
        }

    }
};

