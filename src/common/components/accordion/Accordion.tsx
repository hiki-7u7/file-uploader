import { useState } from 'react';
import toast from 'react-hot-toast';


import accordionStyles from './accordion.module.css';

//TODO mejorar los estilos
//* que te ayude la ariadna

interface Props {
  label: string;
  content: React.ReactNode
}

export const Accordion = ( { label, content }:Props ) => {

  const [showContent, setShowContent] = useState<boolean>(false)

  const handleClick = () => {
    setShowContent( state => !state )
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(label)
    toast.success('link copiado',{
      position: 'top-center'
    })
  }

  return (
    <div className={accordionStyles.accordion}>
        <div className={`${accordionStyles.contentBx} ${ showContent && accordionStyles.active}`}>
            <div className={accordionStyles['label-box']}>
              <span className={accordionStyles.label}>{label.substring(0,40) + '...'}</span>
              <div className={accordionStyles.actions}>
                <b className={accordionStyles['btn-copy']} onClick={handleCopy} >
                  <i className="fa-solid fa-copy" />
                </b>
                {
                  showContent
                  ? <div className={accordionStyles['btn-more']} onClick={handleClick} ><span>-</span></div>
                  : <div className={accordionStyles['btn-more']} onClick={handleClick} ><span>+</span></div>
                }
                
              </div>
            </div>

            <div className={accordionStyles.content}>
              {content}
            </div>
        </div>
    </div>
  )
}
