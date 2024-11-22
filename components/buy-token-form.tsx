"use client"

import React from 'react'

import { useAccount } from 'wagmi'


const BuyTokenForm = () => {
  // states
  const [max, setMax] = React.useState<number>(1)
  const [min, setMin] = React.useState<number>(0.05)
  const [error, setError] = React.useState<string|null>(null);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<number | "">(0.3)

  // wagmi
  const {isConnected} = useAccount();


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.value) return setInputValue("");
    setInputValue(Number(e.target.value))
  }

  return (
    <form className='w-full max-w-[512px] mt-[48px] flex flex-col gap-[.5rem] justify-center items-center bg-[#ffffff] border border-black rounded-[.5rem] p-[1rem] shadow-[12px_12px_0px_rgba(85,_190,_225,_0.5)]'>
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
        type={isConnected ? 'submit' : "button"} 
        className={`text-white bg-[var(--secondary)] p-[.5rem] flex justify-center items-center rounded-[.375rem] w-full text-[16px] ${isPending && "opacity-50"}`}
      >
        {!isConnected ? "Connect Wallet" : isPending ? "Confirming..." : "Send"}
      </button>

      {error && (
        <span className='text-center py-[8px] text-[16px] text-[#Dc2626]'>
          {error}
        </span>
      )}
    </form>
  )
}

export default BuyTokenForm


