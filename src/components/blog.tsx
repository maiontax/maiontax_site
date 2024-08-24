import Image from "next/image";
import Title from "./title";
import Button from "./button";
import { useEffect, useState } from "react";
import { PostItemType } from "../app/blog/page";
import { BASE_URL } from "@/src/config/general";

export default function Blog() {
    const [posts, setPosts] = useState<PostItemType[]>([])

    const getPosts = async () => {
        const response = await fetch(`${BASE_URL}/site/posts`)

        const posts = await response.json()

        setPosts(posts)
    }

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        const observe = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show")
                } else {
                    entry.target.classList.remove("hidden")
                }
            })
        })

        const elemtents = document.querySelectorAll(".component-blog-posts")

        elemtents.forEach((element) => observe.observe(element))
    }, [])

    return (
        <section id="blog" className="component-blog container-view">
            <Title
                title="Nosso blog"
                link={{
                    title: "VEJA MAIS",
                    href: "/blog"
                }}
            />
            <div className="component-blog-posts">
                {posts.map((post, index) => <PostItem {...post} key={index} />)}
            </div>
        </section>
    )
}


function PostItem({ id, title, image_url, content, created_at, description, category }: PostItemType) {
    return (
        <div className="post-item">
            {image_url?.length &&
                <div className="post-item-image">
                    <Image width={400} height={300} src={image_url} alt={title} />
                    <div className="item-image-cover">
                        <div className="tag">{category}</div>
                    </div>
                </div>
            }
            <div className="post-data">
                <h2 className="post-title">{title}</h2>
                <span className="post-content" dangerouslySetInnerHTML={{ __html: description! }}></span>
            </div>
            <div className="post-button">
                <Button type="secondary" title="Leia mais" link={`/blog/${id}`} />
            </div>
        </div>
    )
}