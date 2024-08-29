import Link from "next/link"
import { Fragment } from "react"

type IButtonProps = {
    title: string
    type?: "primary" | "secondary" | "third"
    link?: string
    onClick?: () => void
    htmlType?: "submit" | "reset" | "button"
}

export default function Button({ ...rest }: IButtonProps) {
    const Component = rest.link ? ButtonLink : ButtonSimple

    return (
        <Component {...rest} />
    )
}


const ButtonSimple = ({ htmlType, type = "primary", title }: IButtonProps) => {
    return (
        <button type={htmlType} className={`button ${type}`} title={title}>
            {title}
        </button>
    )
}

const ButtonLink = ({ type = "primary", title, onClick, link }: IButtonProps) => {
    return (
        <Link href={link!} onClick={onClick} style={{ textDecoration: "none" }}>
            <div className={`button ${type}`}>
                {title}
            </div>
        </Link>
    )
}