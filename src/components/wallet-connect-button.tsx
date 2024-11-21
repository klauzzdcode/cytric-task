"use client"

import React from 'react'

const WalletConnectButton = () => {
  return( 
  <div>
    {true && 
      <div
        className='flex justify-center items-center segou_button p-[5px_12px] sm:p-[9px_16px] bg-[#667DFF] text-white text-[13.5px] md:text-[15px] rounded-3xl cursor-pointer hover:bg-[#667DFF]/90 transition' 
      >
        Connect Wallet
      </div>}
  </div>
    
  )
}

export default WalletConnectButton