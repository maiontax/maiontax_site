"use client"
import Image from "next/image";

import { BASE_URL } from "@/src/config/general";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Title from "../../components/title";


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
    const [posts, setPosts] = useState<PostItemType[]>([])

    const getPosts = async () => {
        console.log("getPosts")
        const response = await fetch(`${BASE_URL}/site/posts`)

        const posts = await response.json()

        setPosts(posts.data)
    }


    useEffect(() => {
        getPosts()
    }, [])


    return (
        <main className="page-blog container-view">
            <Title title="Nosso blog" type="secondary" />
            <div className="container">
                <div className="container-posts">
                    {posts.map((post) => (
                        <div key={post.id} className="post-item">
                            <Image width={1024} height={728} src={`${BASE_URL}/site/posts/images/${post.image_url}`} alt="Imagem" />
                            <div className="post-data">
                                <Title align="left" border={false} type="secondary" title={post.title} />
                                <p className="date">{new Date(post.created_at!).toLocaleDateString()}</p>
                                <div className="post-description">
                                    <span>{post.description}</span>
                                </div>
                                <div className="button-container">
                                    <Button link={`/blog/${post.id}`} title="Continuar lendo" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main >
    )
}