"use server"

import BuyTokenForm from "@/components/buy-token-form";

export default async function Home() {
  return (
    <section className="flex flex-col items-center p-[16px] mt-[32px]">
      <h1 className="lg:text-[72px] text-[36px] text-center font-[700] leading-[2.5rem] lg:leading-none">
        Presale
      </h1>
      <p className="text-center mt-[48px] text-[16px] max-w-[32rem]">
        Congratulations, you made it to our presale, which gives you the
        opportunity to buy as one of the first for the cheapest price.
      </p>
      <BuyTokenForm/>
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
          All amounts below 0.05 and above 1 ETH will be refunded.
        </p>
      </div>
      
    </section>
  );
}
