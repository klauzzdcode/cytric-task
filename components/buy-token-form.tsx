"use client"

import React, { Suspense } from 'react'
import Image from 'next/image';

// wagmi
import { useAccount, useSendTransaction } from 'wagmi'
import { estimateGas } from 'wagmi/actions';
import { sepolia } from 'viem/chains';
import { SendTransactionErrorType } from 'wagmi/actions';
import { SendTransactionReturnType } from 'wagmi/actions';

// hooks & api
import axios from 'axios';
import { useExtractError } from '@/hooks/useExtractError';

// appkit 
import { modal } from '@/context';
import { parseEther } from 'viem';
import { config } from '@/config';

// constants
import { api_key } from '@/constants/eatherscan-api-key';


const BuyTokenForm = ({min, max}:{min:number, max:number}) => {
  // states
  const [error, setError] = React.useState<string|null>(null);
  const [success, setSuccess] = React.useState<string|null>(null);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<number | "">(0.3)
  const [transactionLink, setTransactionLink] = React.useState<string>("");
  const [transactionConfirming, setTransactionConfirming] = React.useState<"Conforming..." | "">("");
  const [walletIsConnected, setWalletIsConnected] = React.useState<boolean>()

  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.value) return setInputValue("");
    setInputValue(Number(e.target.value))
  }
  
  // wagmi
  const {address} = useAccount();
  const {sendTransactionAsync} = useSendTransaction();

  React.useEffect(()=>{
    if(address) return setWalletIsConnected(true);
    setWalletIsConnected(false)
  }, [walletIsConnected, address])

  //& handle purchase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!walletIsConnected) return modal.open();
    try {
      setError(null)
      setSuccess(null)
      setIsPending(true)
      setTransactionConfirming("");

      // estimate Gas
      const gas = await estimateGas(config, {});

      // transaction
      const data:SendTransactionReturnType = await sendTransactionAsync({
        chainId: sepolia.id,
        account: address,
        to: "0xb5DAD09F19E55ae8d8d7a052b7447775d9062201",
        value: parseEther(inputValue.toString()),
        gas,
      },
      {
        onError: async (ERROR: SendTransactionErrorType)=>{
          setError(`Error: ${useExtractError(ERROR.stack!)}`); 
        },
      })
      
      // set transaction link for btn
      await setTransactionLink(data)

      setTransactionConfirming("Conforming...");

      // get transaction status
      const getTransactionStatus = async () =>{    
        try {
          const response = await axios.get(
            `https://api-sepolia.etherscan.io/api?module=transaction&action=getstatus&txhash=${data}&apikey=${api_key}`
          );

          const resultMessage = response.data.message;
    
          if (resultMessage === "NOTOK") {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return getTransactionStatus();
          } else if (resultMessage === "OK") {
            await new Promise(resolve => setTimeout(resolve, 30000));
            await axios.get(
              `https://api-sepolia.etherscan.io/api?module=transaction&action=getstatus&txhash=${data}&apikey=${api_key}`
            ).then((data)=>{
              if(data.data.result.isError == "0"){setTransactionConfirming(""); setSuccess("Confirmed"); setError(null); setIsPending(false)}
              if(data.data.result.isError == "1"){setTransactionConfirming(""); setSuccess(null); setError("Failed."); setIsPending(false)}
            })
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }; 
      getTransactionStatus();
      

      setIsPending(false)
      setError(null)
    } catch{} finally{
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={(e)=> {handleSubmit(e)}} className='w-full max-w-[512px] mt-[48px] flex flex-col gap-[.5rem] justify-center items-center bg-[#ffffff] border border-black rounded-[.5rem] p-[1rem] shadow-[12px_12px_0px_rgba(85,_190,_225,_0.5)]'>
      <div className='flex flex-col gap-[.5rem] justify-center items-center w-full'>
        <h2 className='text-[24px] font-[700] leading-[2rem]'>
          Participation Details
        </h2>
        <p className='text-[16px]'>
          Minimum buy in: <span className='text-[var(--secondary)] font-extrabold'>{min} ETH</span> 
        </p>
        <p className='text-[16px]'>
          Maximum buy in: <span className='text-[var(--secondary)] font-extrabold'>{max} ETH</span> 
        </p>
      </div>


      <input 
        type="number" 
        step={0.01} min={min} max={max} 
        value={inputValue} placeholder='0.005' 
        onChange={(e) => {handleInput(e)}}
        required 
        className='w-full p-[8px] border border-[#d1d5db] rounded-[.375rem] text-[100%]' 
      />

      <button
        disabled={isPending || !!transactionConfirming} 
        type={walletIsConnected ? "submit" : "button"} 
        onClick={()=>{!walletIsConnected && modal.open()}}
        className={`relative text-white bg-[var(--secondary)] p-[.5rem] flex justify-center items-center rounded-[.375rem] w-full text-[16px] ${(isPending || !!transactionConfirming) && "opacity-50"}`}
      >
        {!walletIsConnected ? "Connect Wallet" : isPending ? "Confirming..." : "Send"}
      </button>

      {error == "Failed." && (
        <a href={`https://sepolia.etherscan.io/tx/${transactionLink}`} target='_blank' className='flex justify-center items-center p-2 text-[16px] gap-[.5rem] text-[#3B82F6] underline'>
          <Image src={'/etherscan-logo-circle.svg'} alt='logo' width={50} height={50}/>
          View on Etherscan
        </a>
      )}

      {error && (
        <span className='text-center py-[8px] text-[16px] text-[#Dc2626]'>
          {error}
        </span>
      )}
      {success && (
        <a href={`https://sepolia.etherscan.io/tx/${transactionLink}`} target='_blank' className='flex justify-center items-center p-2 text-[16px] gap-[.5rem] text-[#3B82F6] underline'>
          <Image src={'/etherscan-logo-circle.svg'} alt='logo' width={50} height={50}/>
          View on Etherscan
        </a>
      )}
      {transactionConfirming && (
        <span className='text-center py-[8px] text-[13px] text-gray-800'>
          {transactionConfirming}
        </span>
      )}
      {success && (
        <span className='text-center py-[8px] text-[20px] font-[700] text-[#16A34A]'>
          {success}
        </span>
      )}
    </form>
  )
}

export default BuyTokenForm


