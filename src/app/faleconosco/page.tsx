"use client"
import { useState } from "react";
import Title from "../../components/title";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "@/src/components/input";
import Link from "next/link";
import Icon_Linkedn from "@/src/Icon/linkedn";
import { COLOR_PRIMARY } from "@/src/config/general";
import Icon_Instagram from "@/src/Icon/instagram";
import Button from "@/src/components/button";
import { Altcha } from "react-altcha";

type Inputs = {
    name: string
    email: string
    phone: string
    message: string
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
    const [checked, setChecked] = useState<boolean>()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("onSubmit", data)
    }

    const handleAcceptTerms = (e: any) => {
        setChecked(e.target.checked)
    }


    return (
        <main className="page-contactus container-view">
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
                    <form>
                        <Input error={errors.name} {...register("name", { required: "Campo obrigatorio!" })} placeholder="Nome" label="Nome" />
                        <Input type="email" error={errors.email} {...register("email", { required: "Campo obrigatorio!" })} placeholder="E-mail" label="E-mail" />
                        <Input type="phone" error={errors.phone} {...register("phone", { required: "Campo obrigatorio!" })} placeholder="Telefone" label="Telefone" />
                        <Input error={errors.message} {...register("message", { required: "Campo obrigatorio!" })} multipleLine placeholder="Mensagem" label="Mensagem" />
                        <Altcha
                            challengeurl={"https://example.com/api/captcha/challenge"}
                            verifyurl={"https://example.com/api/captcha/verify"}
                        />
                        <div className="police-term"><input type="checkbox" onChange={handleAcceptTerms} />Li e Concordo com os termos de <Link href="/politica-privacidade">Política de Privacidade</Link> do site. </div>
                    </form>
                </div>
                <div className="send-button">
                    <Button title="Enviar" onClick={handleSubmit(onSubmit)} />
                </div>
            </div>
        </main >
    )
}