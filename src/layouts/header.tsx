"use server"

import Image from 'next/image'
import React from 'react'

// components
import WalletConnectButton from '@/components/wallet-connect-button'

const Header = () => {
  return (
    <header className='flex justify-center items-center p-[16px]'>
        <nav className='w-full flex justify-between items-center'>
            <a href="https://grumpy.meme/lander" target='_blank'>
              <Image src={'/logo (1).png'} width={200} height={83} alt='Logo'/>
            </a>
            <WalletConnectButton/>
        </nav>
    </header>
  )
}

export default Header