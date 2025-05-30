"use client"
import Image from "next/image";
import { FaHeart, FaRegHeart, FaComment, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';

import LinkednIcon from "@/public/images/linkedin.svg";
import InstagramIcon from "@/public/images/instagram.svg";
import Link from "next/link";
import { BASE_URL } from "@/src/config/general";
import { useEffect, useState } from "react";
import Title from "../../../components/title";
import { useParams } from 'next/navigation'
import Captcha from "@/src/components/captcha";

export type PostItemType = {
    id: string | number,
    title: string,
    created_at?: string,
    updated_at?: string,
    image_url?: string,
    content?: string
    description?: string
    category?: string
    likes?: any[]
    comments?: any[]
}

type CommentType = {
    id: number,
    name: string,
    email: string,
    text: string,
    created_at: string
}

export default function Blog() {
    const params = useParams<{ id: string }>()
    const [post, setPost] = useState<PostItemType>()
    const [likes, setLikes] = useState(0)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState<CommentType[]>([])
    const [showLikeModal, setShowLikeModal] = useState(false)
    const [showCommentModal, setShowCommentModal] = useState(false)
    const [submittingLike, setSubmittingLike] = useState(false)
    const [submittingComment, setSubmittingComment] = useState(false)
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        comment: '',
        ip: ''
    })

    const commentsRef = useRef<HTMLDivElement>(null)
    const likeModalRef = useRef<HTMLDivElement>(null)
    const commentModalRef = useRef<HTMLDivElement>(null)

    const getPosts = async () => {
        const response = await fetch(`${BASE_URL}/site/posts/${params.id}`)
        const posts = await response.json()
        console.log(posts)
        setPost(posts)

        // Simulando dados de likes e comentários (em produção, buscaria da API)
        setLikes(posts.likes.length)
        setComments(posts.comments)
    }

    // Função para obter o IP do usuário
    const getUserIp = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json')
            const data = await response.json()
            return data.ip
        } catch (error) {
            console.error('Erro ao obter IP:', error)
            return 'unknown'
        }
    }

    useEffect(() => {
        getPosts()

        // Obter o IP do usuário quando a página carrega
        const getIp = async () => {
            const ip = await getUserIp()
            setUserInfo(prev => ({ ...prev, ip }))
        }

        getIp()
    }, [])

    // Impede o scroll do body quando o modal está aberto
    useEffect(() => {
        if (showLikeModal || showCommentModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showLikeModal, showCommentModal])

    const handleLikeClick = () => {
        if (liked) {
            // Se já curtiu, apenas remove a curtida
            setLikes(prev => prev - 1)
            setLiked(false)
        } else {
            // Se não curtiu, abre o modal para coletar informações
            setShowLikeModal(true)
        }
    }

    const handleCommentClick = () => {
        setShowCommentModal(true)
    }

    const scrollToComments = () => {
        if (commentsRef.current) {
            commentsRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLikeSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmittingLike(true)

        // Verifica se já temos o IP, caso contrário, obtém novamente
        let userIp = userInfo.ip
        if (!userIp || userIp === 'unknown') {
            userIp = await getUserIp()
            setUserInfo(prev => ({ ...prev, ip: userIp }))
        }

        // Simulando envio para API com IP
        console.log('Enviando curtida com IP:', userIp)
        try {

            const payload = {
                email: userInfo.email,
                ip: userIp,
                post_id: params.id
            }

            await fetch(`${BASE_URL}/site/posts/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            console.log('Payload de curtida:', payload)

            // Atualiza UI
            setLikes(prev => prev + 1)
            setLiked(true)
            setShowLikeModal(false)
            setSubmittingLike(false)

            // Limpa apenas o comentário, mantém os dados de contato
            setUserInfo(prev => ({ ...prev, comment: '', email: '' }))

        } catch (error) {
            console.error('Erro ao curtir:', error)
        }
    }

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmittingComment(true)

        // Verifica se já temos o IP, caso contrário, obtém novamente
        let userIp = userInfo.ip
        if (!userIp || userIp === 'unknown') {
            userIp = await getUserIp()
            setUserInfo(prev => ({ ...prev, ip: userIp }))
        }

        // Simulando envio para API com IP
        console.log('Enviando comentário com IP:', userIp)

        try {
            const payload = {
                name: userInfo.name,
                email: userInfo.email,
                text: userInfo.comment,
                ip: userIp,
                post_id: params.id
            }

            await fetch(`${BASE_URL}/site/posts/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            console.log('Payload de comentário:', payload)

            const newComment: CommentType = {
                id: Date.now(),
                name: userInfo.name,
                email: userInfo.email,
                text: userInfo.comment,
                created_at: new Date().toISOString()
            }

            setComments(prev => [newComment, ...prev])
            setShowCommentModal(false)
            setSubmittingComment(false)

            // Limpa apenas o comentário, mantém os dados de contato
            setUserInfo(prev => ({ ...prev, comment: '', email: '', name: '' }))
        } catch (error) {
            console.error('Erro ao comentar:', error)
        }

    }

    const shareOnLinkedIn = () => {
        const url = encodeURIComponent(window.location.href)
        const title = encodeURIComponent(post?.title || 'Artigo Maion')
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank')
    }

    const shareOnInstagram = () => {
        window.open('https://www.instagram.com/maiontax/', '_blank')
    }

    const closeModals = () => {
        setShowLikeModal(false)
        setShowCommentModal(false)
    }

    // Fecha o modal se clicar fora dele
    const handleModalOutsideClick = (e: React.MouseEvent, modalRef: React.RefObject<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModals()
        }
    }

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
                    {post?.created_at && <p className="post-date">atualizado em {new Date(post?.updated_at!).toLocaleString()}</p>}

                    <div className="share-buttons">
                        <div className="icon-wrapper">
                            <button
                                onClick={handleLikeClick}
                                className="icon-social like-button"
                                aria-label="Curtir"
                            >
                                {liked ? <FaHeart color="#fff" /> : <FaRegHeart color="#fff" />}
                                <span className="badge">{post?.likes?.length}</span>
                            </button>
                        </div>

                        <div className="icon-wrapper">
                            <button
                                onClick={() => {
                                    scrollToComments();
                                }}
                                className="icon-social comment-button"
                                aria-label="Comentar"
                            >
                                <FaComment color="#fff" />
                                <span className="badge">{comments.length}</span>
                            </button>
                        </div>

                        <Link className="icon-social" href="#" onClick={(e) => { e.preventDefault(); shareOnLinkedIn(); }}>
                            <Image color='#fff' src={LinkednIcon} alt='LinkedIn' />
                        </Link>
                        <Link className="icon-social" href="#" onClick={(e) => { e.preventDefault(); shareOnInstagram(); }}>
                            <Image color='#fff' src={InstagramIcon} alt='Instagram' />
                        </Link>
                    </div>

                    <div className="post-text">
                        <h5>Descrição</h5>
                        {post?.description && <span>{post.description}</span>}
                    </div>
                    <div className="post-text">
                        {post?.content && <span dangerouslySetInnerHTML={{ __html: post?.content }}></span>}
                    </div>

                    {/* Seção de comentários */}
                    <div className="comments-section" ref={commentsRef}>
                        <h3>Comentários ({comments.length})</h3>

                        <button
                            onClick={handleCommentClick}
                            className="btn-comment"
                        >
                            Deixe seu comentário
                        </button>

                        <div className="comments-list">
                            {comments.map(comment => (
                                <div key={comment.id} className="comment-item">
                                    <div className="comment-header">
                                        <h4>{comment.name}</h4>
                                        <span>{new Date(comment.created_at).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <p>{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal simples de Curtida */}
            {showLikeModal && (
                <div
                    className="modal-backdrop"
                    onClick={(e) => handleModalOutsideClick(e, likeModalRef)}
                >
                    <div className="modal-content" ref={likeModalRef}>
                        <div className="modal-header">
                            <h3>Deixe suas informações para curtir</h3>
                            <button
                                onClick={closeModals}
                                className="close-modal"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleLikeSubmit} className="modal-form">
                            {/* <div className="form-group">
                                <label htmlFor="like-name">Nome*</label>
                                <input
                                    type="text"
                                    id="like-name"
                                    name="name"
                                    required
                                    value={userInfo.name}
                                    onChange={handleInputChange}
                                />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="like-email">Email*</label>
                                <input
                                    type="email"
                                    id="like-email"
                                    name="email"
                                    required
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="like-phone">Telefone*</label>
                                <input
                                    type="tel"
                                    id="like-phone"
                                    name="phone"
                                    required
                                    value={userInfo.phone}
                                    onChange={handleInputChange}
                                />
                            </div> */}
                            <Captcha floating />
                            <button
                                type="submit"
                                className="btn-modal"
                                disabled={submittingLike}
                            >
                                {submittingLike ? 'Enviando...' : 'Curtir'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal simples de Comentário */}
            {showCommentModal && (
                <div
                    className="modal-backdrop"
                    onClick={(e) => handleModalOutsideClick(e, commentModalRef)}
                >
                    <div className="modal-content" ref={commentModalRef}>
                        <div className="modal-header">
                            <h3>Deixe seu comentário</h3>
                            <button
                                onClick={closeModals}
                                className="close-modal"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleCommentSubmit} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="comment-name">Nome*</label>
                                <input
                                    type="text"
                                    id="comment-name"
                                    name="name"
                                    required
                                    value={userInfo.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment-email">Email*</label>
                                <input
                                    type="email"
                                    id="comment-email"
                                    name="email"
                                    required
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="comment-phone">Telefone*</label>
                                <input
                                    type="tel"
                                    id="comment-phone"
                                    name="phone"
                                    required
                                    value={userInfo.phone}
                                    onChange={handleInputChange}
                                />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="comment">Seu comentário*</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    rows={4}
                                    required
                                    value={userInfo.comment}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Captcha floating />
                            <button
                                type="submit"
                                className="btn-modal"
                                disabled={submittingComment}
                            >
                                {submittingComment ? 'Enviando...' : 'Publicar comentário'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}   