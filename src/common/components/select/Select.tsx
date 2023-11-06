import { ErrorMessage, useField } from 'formik';
import selectStyles from './select.module.css';

interface Props {
    id: string;
    children: React.ReactNode;
    mt?: number;
    mb?: number;

    name: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
}

export const Select = ( { children, id, mb, mt, ...props }: Props ) => {

  const [ field ] = useField(props)

  return (
    <>
      <div 
        className={selectStyles.select}
        style={{ 
          marginTop: `${mt}px`, 
          marginBottom: `${mb}px` 
        }}  
      >
            <select 
              id={id}
              {...field}
              {...props}
            >
              {children}
            </select>
      </div>
      <ErrorMessage className={selectStyles.span} name={ props.name } component="span" />
    </>
  )
}
