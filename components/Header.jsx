import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({children}) => {
  return (
    <div className='header'>
        <Link href={'/'} className='md:flex-1 flex items-center gap-2'>
            <Image src={"/assets/logo.png"} alt='logo' width={30} height={30} className='hidden md:block' />
            <h1 className='font-bold font-serif text-xl text-lime-300'>SyncScript</h1>
        </Link>
        {children}
    </div>
  )
}

export default Header