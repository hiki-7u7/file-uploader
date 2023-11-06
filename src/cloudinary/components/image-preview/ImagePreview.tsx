
import { Button } from '@/common/components';
import { bytesToUnit } from '@/common/helpers';
import imagePreviewStyles from './image-preview.module.css';
import { SerializableFile } from '@/cloudinary/interfaces';
import { useAppDispatch } from '@/cloudinary/store/hook';
import { removeImagePreview } from '@/cloudinary/store/cloudinary/cloudinarySlice';

interface Props {
  file: SerializableFile,
}

export const ImagePreview = ( { file }:Props ) => {
  
  const dispatch = useAppDispatch()

  return (
    <div className={imagePreviewStyles.container}>
        <div className={imagePreviewStyles.image}>
            <img src={ file.imageBase64 } alt="file-preview" />
        </div>
        <div className={imagePreviewStyles['min-info']}>
            <p className={imagePreviewStyles.name} >name: <span>{ file.name }</span></p>
            <p className={imagePreviewStyles.size} >size: <span>{bytesToUnit(file.size)}</span></p>
            <p className={imagePreviewStyles.type} >type: <span>{file.type}</span></p>
        </div>
        <Button
            label="Remove file"
            type="button"
            width="100%"
            style={{
              backgroundColor:"#EB1D36"
            }}
            icon={<i className="fa-solid fa-trash"></i>}
            onClick={ () => dispatch(removeImagePreview(file.id)) }
        />
    </div>
  )
}
