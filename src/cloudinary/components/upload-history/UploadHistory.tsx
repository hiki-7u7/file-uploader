import { Accordion } from '@/common/components';
import { AccordionContent } from '@/cloudinary/components'
import { useAppSelector } from '@/cloudinary/store/hook';
import uploadHistoryStyles from './upload-history.module.css';


export const UploadHistory = () => {

  const { uploadedFiles } = useAppSelector( state => state.cloudinary )

  return (
    <div className={uploadHistoryStyles.container}>

        {
          (uploadedFiles.length <= 0)
          ? (
            <div className={uploadHistoryStyles.empty}>
              <p>Ningun archivo subido</p>
            </div>
          )
          : (
            uploadedFiles.map( u => (
              <Accordion 
                key={u.publicId}
                label={u.secureUrl}  
                content={ <AccordionContent uploadedFile={u}/> }  
              />
            ))
          )

          
        }

    </div>
  )
}
