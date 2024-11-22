import "./globals.css";
import { headers } from "next/headers"; // added
import type { Metadata } from "next";

// ! provider
import ContextProvider from '@/context'

// * components
import Header from "@/layouts/header";

// ~ metadata
export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect"
};

// fonts
import { Righteous } from "next/font/google";
const righteous = Righteous({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-righteous",
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = headers().get('cookie')
  return (
    <html lang="en">
      <body className={`${righteous.className} antialiased`}>
        <ContextProvider cookies={cookies}>
          <Header/>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}