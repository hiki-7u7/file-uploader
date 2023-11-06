import { Uploads } from '@/cloudinary/interfaces';
import accordionContentStyles from './accordion-content.module.css';
import { bytesToUnit } from '@/common/helpers';

interface Props {
    uploadedFile: Uploads
}

export const AccordionContent = ({uploadedFile}: Props) => {
  return (
    <div className={accordionContentStyles.container}>
        <div className={accordionContentStyles.image}>
            <a href={uploadedFile.secureUrl} target='_blank'>
              <img src={ uploadedFile.secureUrl } alt={uploadedFile.originalFileName} />
            </a>
        </div>
        <div className={accordionContentStyles['min-info']}>
            <p>name: <span>{uploadedFile.originalFileName}</span></p>
            <p>public_id: <span>{uploadedFile.publicId.split('/')[uploadedFile.publicId.split('/').length - 1]}</span></p>
            <p>folder: <span>{uploadedFile.folder}</span></p>
            <p>size: <span>{bytesToUnit(uploadedFile.bytes)}</span></p>
            <p>format: <span>{uploadedFile.format}</span></p>
        </div>
    </div>
  )
}
