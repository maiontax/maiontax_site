import React from "react"
import Image from "next/image"
import Header from "@/src/components/header"

type ILayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
    return (
        <main>
            <Header />
            {children}
        </main>
    )
}