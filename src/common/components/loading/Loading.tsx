import loadingSyles from './loading.module.css'

export const Loading = () => {
  return (
    <div className={loadingSyles.loading}>
        <span className={loadingSyles.loader}></span>
    </div>
  )
}
