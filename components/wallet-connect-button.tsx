"use client"

import React from 'react'

// wagmi
import { useAccount } from 'wagmi'

// components
import W3mButton from './w3m-button';

const WalletConnectButton = () => {
  const {address} = useAccount();
  const [isConnected, setIsConnected] = React.useState<boolean>()

  React.useEffect(()=>{
    if(address) return setIsConnected(true);
    setIsConnected(false)
  }, [isConnected, address])

  return( 
    <div>
      {!isConnected ? <W3mButton/> : <w3m-account-button/>}
    </div> 
  );
}

export default WalletConnectButton