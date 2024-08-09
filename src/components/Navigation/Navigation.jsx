import clsx from "clsx"
import { NavLink } from "react-router-dom"
import styles from './Navigations.module.css'
const Navigation = () => {
  return (
    <div>
        <nav className={styles.nav_container}>
        <div className={styles.inner_container}>
          <NavLink to='/' className={({isActive}) => {
            return clsx('link', isActive && 'isActive')
          }}>Home</NavLink>
          <NavLink to='/movies'  className={({isActive}) => {
            return clsx('link', isActive && 'isActive')
          }}>Movies</NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navigation