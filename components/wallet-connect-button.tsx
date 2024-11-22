"use client"

import React from 'react'

import { useAccount } from 'wagmi'

const WalletConnectButton = () => {
  const {isConnected} = useAccount();
  return( 
    <div>
      {!isConnected && <w3m-button/>}
      {isConnected && <w3m-account-button/>}
    </div> 
  );
}

export default WalletConnectButton