import type { Metadata } from "next";
import Head from 'next/head';
import { Poppins, Montserrat, Cardo } from "next/font/google";
import "./scss/_global.scss"
import 'animate.css';


const poppins = Poppins({
  weight: ['400', "600", "700"],
  subsets: ['latin'],
  display: 'swap',
})

const montsserat = Montserrat({
  weight: ['400', "600", "700"],
  subsets: ['latin'],
  display: 'swap',
})

const cardo = Cardo({
  weight: ["700"],
  subsets: ['latin'],
  display: 'swap',
})

// const raleway = Raleway({
//   weight: ['400', "600", "700"],
//   subsets: ['latin'],
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: "Maion Tax",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${montsserat.className} ${poppins} ${cardo}`}>
        {children}</body>
    </html>
  );
}
