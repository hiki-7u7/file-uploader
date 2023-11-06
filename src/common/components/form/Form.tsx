import formStyles from './form.module.css';

interface Props {
    onSubmit: ( event: React.FormEvent<HTMLFormElement> ) => void;
    title: string;
    subTitle: string;
    children: React.ReactNode;
}

export const Form = ( { children,onSubmit,subTitle,title }: Props ) => {
  return (
    <form onSubmit={onSubmit} className={formStyles.form}>
        { title && <h2>{title}</h2>}
        { subTitle && <h3>{subTitle}</h3>}
        {children}
    </form>
  )
}
