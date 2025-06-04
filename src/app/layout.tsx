import type { Metadata } from "next";
import { Poppins, Montserrat, Cardo } from "next/font/google";
import "../scss/_global.scss"
import 'animate.css';
import { Suspense } from "react";
import { GoogleTagManager } from '@next/third-parties/google'
import WhatsApp from "../components/whatsapp";
import PageTracker from "../components/pageTracker";
import dynamic from "next/dynamic";
const PixelTracker = dynamic(() => import("../components/pixelTracker"), { ssr: false });
import { LinkedInInsightTag } from 'nextjs-linkedin-insight-tag'


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
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '870309275302770');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=870309275302770&ev=
            PageView&noscript=1"/>
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${montsserat.variable} ${poppins.variable} ${cardo.variable}`}>
        <GoogleTagManager gtmId="GTM-TT3HWN64" />
        <PixelTracker />
        <LinkedInInsightTag />
        {children}
        <WhatsApp />
      </body>
      <Suspense fallback={null}>
        <PageTracker />
      </Suspense>
    </html>
  );
}
