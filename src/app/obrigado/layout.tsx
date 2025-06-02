import React from "react"
import Image from "next/image"
import Header from "@/src/components/header"
import { GoogleTagManager } from "@next/third-parties/google"

type ILayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
    return (
        <main>
            <Header />
            {children}
            <GoogleTagManager gtmId="GTM-TT3HWN64" />
        </main>
    )
}