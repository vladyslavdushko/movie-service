import style from './LoadMoreBtn.module.css'
const LoadMoreBtn = ({ children, onClick, disabled }) => {

    return (
    <>
      <button className={style.button} onClick={onClick} disabled={disabled}>
      {children}
    </button> 
    
    </>
  )
}

export default LoadMoreBtn