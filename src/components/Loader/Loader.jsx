import { InfinitySpin } from 'react-loader-spinner'
import styles from './Loader.module.css'
const Loader = () => {
  return (
    
    <div className={styles.container}>
      <InfinitySpin
        visible={true}
        width="200"
        color="#000"
        ariaLabel="infinity-spin-loading"
        className={styles.loader}
        />
    </div>
)
  
}

export default Loader