import type { Metadata } from "next";
import { Poppins, Montserrat, Cardo } from "next/font/google";
import "../scss/_global.scss"
import 'animate.css';
import { Suspense } from "react";
import { FacebookPixelEvents } from "../components/pixel-events";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";


const poppins = Poppins({
  weight: ['400', "600", "700"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

const montsserat = Montserrat({
  weight: ['400', "600", "700"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const cardo = Cardo({
  weight: ["700"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cardo',
})

export const metadata: Metadata = {
  title: "Maion Tax",
  description: "Recuperação tributária eficiente, com 12 anos de experiência, a MAION TAX já recuperou mais de 500 milhões em tributos para empresas, oferecendo serviços rápidos e seguros. Confie na nossa expertise para maximizar a recuperação tributária do seu negócio.",
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://maiontax.com.br/',
    siteName: 'Maion Tax',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W5XZX7Z4"
        height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
      <body className={`${montsserat.variable} ${poppins.variable} ${cardo.variable}`}>
        {children}
        <div className="whatsapp">
          <Link href="https://wa.me/551142187960" target="_blank">
            <Image src="/images/whatsapp.png" alt="Whatsapp" width={70} height={70} />
          </Link>
        </div>
      </body>
      <Suspense fallback={null}>
        <FacebookPixelEvents />
      </Suspense>
      <Script id="gtm" strategy="afterInteractive">
        {`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W5XZX7Z4');</script>`}
      </Script>
    </html>
  );
}
