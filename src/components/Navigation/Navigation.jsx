import clsx from "clsx"
import { NavLink } from "react-router-dom"

const Navigation = () => {
  return (
    <div>
              <nav className='nav_container'>
        <NavLink to='/' className={({isActive}) => {
          return clsx('link', isActive && 'isActive')
        }}>Home</NavLink>
        <NavLink to='/movies'  className={({isActive}) => {
          return clsx('link', isActive && 'isActive')
        }}>Movies</NavLink>
      </nav>
    </div>
  )
}

export default Navigation