"use client"
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "@/src/components/input";
import Link from "next/link";
import Icon_Linkedn from "@/src/Icon/linkedn";
import { BASE_URL, COLOR_PRIMARY } from "@/src/config/general";
import Icon_Instagram from "@/src/Icon/instagram";
import Button from "@/src/components/button";
import Captcha from "@/src/components/captcha";
import { sendGTMEvent } from "@next/third-parties/google";
import Title from "@/src/components/title";

type Inputs = {
    name: string
    email: string
    phone: string
    message: string
    ocupation: string
    accetption: boolean
}


export type PostItemType = {
    id: string | number,
    title: string,
    created_at?: string,
    image_url?: string,
    content?: string
    description?: string
    category?: string
}

export default function ContactUs() {
    const [sending, setSending] = useState(false)
    const [isSended, setIsSended] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    return (
        <main className="page-contactus container-view" style={{ paddingBottom: 200 }}>
            <Title title="Fale conosco" type="secondary" />
            <div className='social-container'>
                <Link target='_blank' className="icon-social" href="https://www.linkedin.com/company/maion-tax-solu-es-tribut-rias-e-corporativas/posts/?feedView=all">
                    <Icon_Linkedn fill={COLOR_PRIMARY} />
                </Link>
                <Link target='_blank' className="icon-social" href="https://www.instagram.com/maiontax/">
                    <Icon_Instagram fill={COLOR_PRIMARY} />
                </Link>
            </div>
            <div className="container">
                <div className="form">
                    <div className="success-message">
                        <h2>Mensagem enviada com sucesso!</h2>
                        <h3>Obrigado por entrar em contato, retornaremos o mais breve possivel!</h3>
                        <Button title="Voltar para home" link="/" />
                    </div>
                </div>
            </div>
        </main >
    )
}