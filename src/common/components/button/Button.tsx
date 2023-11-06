import buttonStyles from './button.module.css'

interface Props {
    type: "button" | "submit" | "reset";
    label: string;
    icon?: React.JSX.Element;
    mt?: number;
    mb?: number;
    width?: string;
    style?: React.CSSProperties;
    onClick?: () => void
}

export const Button = ( { label, type, icon, mb, mt, onClick, width, style }:Props ) => {
  return (
    <button
      onClick={onClick}
      className={buttonStyles.button} 
      type={type}
      style={{ 
        marginTop: `${mt}px`,
        marginBottom: `${mb}px`,
        width: `${width}`,
        ...style
      }}
    >
        {label}
        {icon && icon}
    </button>
  )
}
