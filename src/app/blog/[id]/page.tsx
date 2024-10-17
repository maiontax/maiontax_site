"use client"
import Image from "next/image";

import LinkednIcon from "@/public/images/linkedin.svg";
import InstagramIcon from "@/public/images/instagram.svg";
import Link from "next/link";
import { BASE_URL } from "@/src/config/general";
import { useEffect, useState } from "react";
import Title from "../../../components/title";
import { useParams } from 'next/navigation'


export type PostItemType = {
    id: string | number,
    title: string,
    created_at?: string,
    image_url?: string,
    content?: string
    description?: string
    category?: string
}

export default function Blog() {
    const params = useParams<{ id: string }>()
    const [post, setPost] = useState<PostItemType>()

    const getPosts = async () => {
        console.log("getPosts")
        const response = await fetch(`${BASE_URL}/site/posts/${params.id}`)

        const posts = await response.json()

        console.log(posts)

        setPost(posts)
    }


    useEffect(() => {
        getPosts()
    }, [])


    return (
        <main className="page-blog container-view">
            <div className="container">
                <div className="post-header">
                    {post?.image_url && <Image src={`${BASE_URL}/site/posts/images/${post.image_url}`} alt="Image" width={400} height={400} />}
                    {/* <div className="breadcrumbs">
                            <a href="#">Home</a> / <a href="#">Blog</a> / <a href="#">Título do Post</a>
                        </div> */}
                </div>
                <div className="post-content">
                    {post?.title && <Title align="left" type="secondary" title={post.title} />}
                    {post?.created_at && <p className="post-date">{new Date(post?.created_at).toLocaleString()}</p>}
                    <div className="share-buttons">
                        <Link className="icon-social" href="https://www.linkedin.com/company/maion-tax-solu-es-tribut-rias-e-corporativas/posts/?feedView=all" >
                            <Image color='#fff' src={LinkednIcon} alt='Linkedn' />
                        </Link>
                        <Link className="icon-social" href="https://www.instagram.com/maiontax/" >
                            <Image color='#fff' src={InstagramIcon} alt='Linkedn' />
                        </Link>
                    </div>
                    <div className="post-text">
                        <h5>Descrição</h5>
                        {post?.description && <span>{post.description}</span>}
                    </div>
                    <div className="post-text">
                        {post?.content && <span dangerouslySetInnerHTML={{ __html: post?.content }}></span>}
                    </div>
                </div>
                {/* <div className="sidebar"> */}
                {/* <h3>Inscreva-se em nossa newsletter:</h3>
                    <form className="newsletter-form">
                        <label >Email*</label>
                        <input type="email" id="email" name="email" />
                        <label >Nome*</label>
                        <input type="text" id="name" name="name" />
                        <Button title="Enviar" />
                    </form> */}
                {/* <h3>Os mais lidos</h3>
                        <ul className="most-read">
                            <li><a href="#">Como limitar a contribuição ao Sistema S à base de 20 salários mínimos?</a></li>
                            <li><a href="#">O que são encargos trabalhistas? Calcule o custo dos funcionários</a></li>
                            <li><a href="#">RAT ajustado: o que é e como calcular o da sua empresa</a></li>
                            <li><a href="#">Impostos sobre a folha de pagamento</a></li>
                        </ul> */}
                {/* </div> */}
            </div>
        </main >
    )
}