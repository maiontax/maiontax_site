import Link from "next/link"
import { Fragment } from "react"

type IButtonProps = {
    title: string
    type?: "primary" | "secondary" | "third"
    link?: string
    onClick?: () => void
}

export default function Button({ title, type = "primary", link = "", onClick }: IButtonProps) {
    return (
        <Link href={link} onClick={onClick}>
            <button className={`button ${type}`} title={title}>
                {title}
            </button>
        </Link>
    )
}