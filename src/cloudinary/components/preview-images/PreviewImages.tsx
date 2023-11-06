import { ImagePreview } from '@/cloudinary/components';
import previewImagesStyles from './preview-images.module.css';
import { useAppSelector } from '@/cloudinary/store/hook';
import { Loading } from '@/common/components';

export const PreviewImages = () => {
  
  const { imagePreviews, isUploading } = useAppSelector( state => state.cloudinary )

  return (
    <div className={previewImagesStyles.container}>
      {
        isUploading
        ? <Loading />
        : (imagePreviews.length <= 0 )
          ? (
            <div className={previewImagesStyles.empty}>
              <p>Ningun archivo seleccionado</p>
            </div>
          )
          : (
            imagePreviews.map( file => (
              <ImagePreview file={file} key={file.id}/>
            ))
          ) 
      }
    </div>
  )
}
