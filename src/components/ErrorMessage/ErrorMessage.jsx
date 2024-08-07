import styles from './ErrorMessage.module.css'
const ErrorMessage = ({error}) => {
  return (
    <div>
        <p className={styles.error_text}>Opps... Error occured:</p>
        <p className={styles.error_text}>{error}</p>
    </div>
  )
}

export default ErrorMessage