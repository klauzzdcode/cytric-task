"use client"

import Image from 'next/image'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center gap-3 mt-3'>
        <h1 className='text-[40px]'>404</h1>
        <h3 className='text-[50px]'>Not Found</h3>
        <Image src={'/404-error-dribbble-800x600.gif'} alt='not found' height={200} width={300}/>
    </div>
  )
}

export default ErrorPage