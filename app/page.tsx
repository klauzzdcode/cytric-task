'use client';

import React from "react";

// components
import BuyTokenForm from "@/components/buy-token-form";

// constants
import { abi } from "@/constants/abi";

// smart contract
import { config } from "@/config";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

export default function Home() {
  // states
  const [max, setMax] = React.useState<number>(1)
  const [min, setMin] = React.useState<number>(0.005)

  // wagmi
  const {address} = useAccount();

  // get minPurchase 
  const getMinPurchase= async () => {
    const minPurchase =  await readContract(config,{
      chainId: sepolia.id,
      abi,
      address: "0xd279ed8a83fa611fAc1401814927f118F80FEB5E",
      functionName: "minPurchase",
      args: [],
  
    });
    if(minPurchase) return setMin(Number(minPurchase)/10**18);
  }

  // get maxPurchase
  const getMaxPurchase= async () => {
    const maxPurchase =  await readContract(config,{
      chainId: sepolia.id,
      account: address,
      abi,
      address: "0xd279ed8a83fa611fAc1401814927f118F80FEB5E",
      functionName: "maxPurchase",
      args: [],
    })
    if(maxPurchase) return setMax(Number(maxPurchase)/10**18);
  }

  React.useEffect(()=>{
    getMinPurchase()
    getMaxPurchase()
  }, []);

  return (
    <section className="flex flex-col items-center p-[16px] mt-[32px]">
      <h1 className="lg:text-[72px] text-[36px] text-center font-[700] leading-[2.5rem] lg:leading-none">
        Presale
      </h1>
      <p className="text-center mt-[48px] text-[16px] max-w-[32rem]">
        Congratulations, you made it to our presale, which gives you the
        opportunity to buy as one of the first for the cheapest price.
      </p>
      <BuyTokenForm min={min} max={max}/>
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="w-full text-center text-[24px] font-[700] mt-[48px] leading-[2rem]">
          Warning
        </h3>
        <p className="text-[16px] text-center">
          Do not send funds from an exchange. You will lose your funds if you do.
        </p>
        <p className="text-[16px] text-center">
          Make sure you are connected to the Ethereum Mainnet and have a sufficient amount of ETH in your wallet.
        </p>
        <p className="text-[16px] text-center">
          All amounts below {min} and above {max} ETH will be refunded.
        </p>
      </div>
    </section>
  );
}
