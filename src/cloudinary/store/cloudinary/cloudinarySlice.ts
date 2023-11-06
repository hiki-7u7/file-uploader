import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Uploads, SerializableFile } from '@/cloudinary/interfaces';

interface CloudinaryState {
    uploadedFiles: Uploads[],
    imagePreviews: SerializableFile[],
    isUploading: boolean
}

const initialState: CloudinaryState = {
    uploadedFiles: [],
    imagePreviews: [],
    isUploading: false
}

//TODO cambia la forma de insertar uploads
//* no le hagas caso al mensaje de arriba solo usa mejor el useEffect para que no haga el duplicado
//* pero con el modo stricto igual se hara recuerda que con el modo estricto se ejecuta dos veces el effect

export const cloudinarySlice = createSlice({
  name: 'cloudinary',
  initialState,
  reducers: {
    setImagePreviews: (state, action: PayloadAction<SerializableFile[]> ) => {
        state.imagePreviews = [...action.payload]
    },
    removeImagePreview: (state, action: PayloadAction<string> ) => {
        state.imagePreviews = state.imagePreviews.filter( img => img.id !== action.payload )
    },
    setUploadedFiles: (state, action: PayloadAction<Uploads[]>) => {
        state.uploadedFiles = [...action.payload,...state.uploadedFiles].splice(0,25);
    },
    setIsUploading:( state, action: PayloadAction<boolean>) => {
        state.isUploading = action.payload       
    },
  },
})

export const { setImagePreviews, setUploadedFiles, removeImagePreview, setIsUploading } = cloudinarySlice.actions
