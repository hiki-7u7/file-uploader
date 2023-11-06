import { configureStore } from '@reduxjs/toolkit';
import { cloudinarySlice } from './cloudinary/cloudinarySlice';

export const store = configureStore({
  reducer: {
    cloudinary: cloudinarySlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch