"use client"
import { useState } from "react";
import Title from "../../components/title";
import { useForm, SubmitHandler } from "react-hook-form"
import Input from "@/src/components/input";
import Link from "next/link";
import Icon_Linkedn from "@/src/Icon/linkedn";
import { BASE_URL, COLOR_PRIMARY } from "@/src/config/general";
import Icon_Instagram from "@/src/Icon/instagram";
import Button from "@/src/components/button";
import Captcha from "@/src/components/captcha";
import { useRouter } from "next/navigation";

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
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setSending(true)

        try {
            const response = await fetch(`${BASE_URL}/site/leads`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to send data')
            }

            if (response.ok) {

                reset()

                setSending(false)

                window.location.href = "https://maiontax.com.br/obrigado";
            }

        } catch (error) {
            console.error('Error sending form data:', error)
        }
    }

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input error={errors.name} register={register("name", { required: "Campo obrigatorio!" })} placeholder="Nome" label="Nome" />
                        <Input type="email" error={errors.email} register={register("email", { required: "Campo obrigatorio!" })} placeholder="E-mail" label="E-mail" />
                        <Input type="phone" error={errors.phone} register={register("phone", { required: "Campo obrigatorio!" })} placeholder="Telefone" label="Telefone" />
                        <Input type="ocupation" error={errors.phone} register={register("ocupation", { required: "Campo obrigatorio!" })} placeholder="Profissão" label="Profissão" />
                        <Input error={errors.message} register={register("message", { required: "Campo obrigatorio!" })} multipleLine placeholder="Mensagem" label="Mensagem" />
                        <Captcha floating />
                        <div className="police-term">
                            <input type="checkbox" {...register("accetption", { required: "Campo obrigatorio!" })} />Li e Concordo com os termos de <Link className="link" href="/politica-privacidade">Política de Privacidade</Link> do site.
                            {errors.accetption && <><br /><span className="error">{errors.accetption?.message}</span></>}
                        </div>
                        <div className="send-button">
                            <Button title="Enviar" htmlType="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </main >
    )
}