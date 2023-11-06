import { useField, ErrorMessage } from 'formik';
import inputFieldStyles from './input-field.module.css';

interface Props {
    id: string;
    mt?: number;
    mb?: number;
    width?: number;
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
}

export const InputField = ({ id, label, mb, mt, width, ...props }: Props) => {

  const [ field ] = useField(props)

  return (

    <div 
      className={inputFieldStyles["input-group"]}
      style={{ 
        marginTop: `${mt}px`, 
        marginBottom: `${mb}px`,
        width: `${width}px`
      }}  
    >
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...field}
        {...props}
      />
       <ErrorMessage name={ props.name } component="span" />
    </div>
  
  );
};
