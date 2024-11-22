"use client"

import React from 'react'

// wagmi
import { useAccount, useWriteContract } from 'wagmi'
import { sepolia } from 'viem/chains';

// constants
import {abi} from '../constants/abi';

// appkit 
import { modal } from '@/context';




const BuyTokenForm = () => {
  // states
  const [max, setMax] = React.useState<number>(1)
  const [min, setMin] = React.useState<number>(0.05)
  const [error, setError] = React.useState<string|null>(null);
  const [success, setSuccess] = React.useState<string|null>(null);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<number | "">(0.3)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.value) return setInputValue("");
    setInputValue(Number(e.target.value))
  }

  // wagmi
  const {isConnected, address} = useAccount();
  const {writeContractAsync} = useWriteContract();
  

  //& handle purchase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!address) return modal.open();
    try {
      setError(null)
      setSuccess(null)
      setIsPending(true)

      const data = await writeContractAsync({
        chainId: sepolia.id,
        address: "0xd279ed8a83fa611fAc1401814927f118F80FEB5E",
        functionName: "buyPresale",
        abi,
        args: [
          BigInt(Number(inputValue)*(10**18)),
        ],
      })
      console.log(data);
      setIsPending(false)
      setError(null)
      setSuccess("Successfully")
    } catch (error) {
      setIsPending(false)
      setSuccess(null)
      setError("Something went wrong")
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
        disabled={isPending} 
        type={isConnected ? "submit" : "submit"} 
        className={`relative text-white bg-[var(--secondary)] p-[.5rem] flex justify-center items-center rounded-[.375rem] w-full text-[16px] ${isPending && "opacity-50"}`}
      >
        {!isConnected ? "Connect Wallet" : isPending ? "Confirming..." : "Send"}
      </button>

      {error && (
        <span className='text-center py-[8px] text-[16px] text-[#Dc2626]'>
          {error}
        </span>
      )}
      {success && (
        <span className='text-center py-[8px] text-[16px] text-emerald-500'>
          {success}
        </span>
      )}
    </form>
  )
}

export default BuyTokenForm


