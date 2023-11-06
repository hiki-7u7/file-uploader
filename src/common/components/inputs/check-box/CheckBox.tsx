import checkBoxStyles from './check-box.module.css';

interface Props{
    label?: string;
    name: string;
    id: string;
    mt?: number;
    mb?: number;
    checked: boolean;
    onChange?: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}

export const CheckBox = ( { id, name, label, mb, mt, checked = false, onChange }: Props ) => {
  return (
    <div
        className={checkBoxStyles.checkbox}
        style={{
            marginTop: `${mt}px`,
            marginBottom: `${mb}px`
        }}
    >
        <input 
          type="checkbox" 
          name={name} 
          id={id} 
          checked={checked} 
          onChange={onChange}  
        / >
        <label htmlFor={id}>{label}</label>
    </div>
  )
}
