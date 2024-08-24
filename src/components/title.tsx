import Link from "next/link"

type TitleTypes = {
    title: string
    link?: {
        title?: string
        href: string
    }
    type?: "primary" | "secondary"
    border?: boolean
    size?: number
    align?: "left" | "right" | "center"
}

export default function Title({ title, link, type = "primary", border = true, size, align = "center" }: TitleTypes) {
    return (
        <div className="component-title" style={{ textAlign: align }}>
            <div className="title-container">
                <span style={{ borderWidth: border ? 2 : 0, fontSize: size }} className={`title ${type}`}>{title}</span>
            </div>
            {
                link?.title && (
                    <div className="link-container">
                        <Link href={link.href} >{link.title}</Link>
                    </div>
                )
            }
        </div >
    )
}