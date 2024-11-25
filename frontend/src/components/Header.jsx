import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Header = ({children}) => {
  return (
    <div className='header'>
        <Link to={"/"} className='md:flex-1' >
            <img src={logo} alt="logo" width={40} height={40} />
        </Link>
        {children}
    </div>  
  )
}

export default Header