import { useRef } from 'react';
// import inputFileStyles from './input-file.module.css';
import { Button } from '../../button';

interface Props {
    id: string;
    multiple: boolean;
    name: string;
    onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
    mt?: number;
    mb?: number;
}

export const InputFile = ( { id, multiple, name, onChange, mb, mt }: Props ) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  };

  return (
    <div
      style={{ 
        marginTop: `${mt}px`, 
        marginBottom: `${mb}px` 
      }}
    >
        <input
            ref={fileInputRef} 
            type="file" 
            id={id}
            multiple={multiple} 
            name={name}
            onChange={onChange}/>


        <Button 
          label="Elegir archivos"
          type="button"
          icon={<i className="fa-solid fa-upload" />}
          onClick={handleClick}
        />
        
    </div>
  )
}
