import type { Metadata } from "next";
import "./globals.css";

// components & sections
import Header from "@/layouts/header";


// fonts
import localFont from "next/font/local";
const righteous = localFont({
  src: "./fonts/Righteous-Regular.ttf",
  variable: "--font-righteous",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${righteous.className} antialiased`}
      >
          <Header/>
          {children}
      </body>
    </html>
  );
}