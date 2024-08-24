import Link from "next/link"

type IButtonProps = {
    title: string
    type?: "primary" | "secondary" | "third"
    link?: string
}

export default function Button({ title, type = "primary", link = "" }: IButtonProps) {
    return (
        <Link href={link}>
            <button className={`button ${type}`} title={title}>
                {title}
            </button>
        </Link>
    )
}