"use client"

import Description from "../../components/description";
import Header from "../../components/header";
import KnowMore from "../../components/knowMore";
import Services from "../../components/services";
import Blog from "../../components/blog";
import Image from "next/image";
import { useEffect } from "react";
import ReactPlayer from 'react-player'
import HowToWork from "../../components/howToWork";
import Units from "../../components/units";
import Customers from "../../components/customers";

export default function Home() {
    useEffect(() => {
        const observe = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains("right")) {
                        entry.target.classList.add("animate__fadeInRight", "animate__animated")
                    }
                    if (entry.target.classList.contains("left")) {
                        entry.target.classList.add("animate__fadeInLeft", "animate__animated")
                    }
                    if (entry.target.classList.contains("up")) {
                        entry.target.classList.add("animate__fadeInUp", "animate__animated")
                    }

                } else {
                    if (entry.target.classList.contains("right")) {
                        entry.target.classList.remove("animate__animated", "animate__fadeInRight")
                    }
                    if (entry.target.classList.contains("left")) {
                        entry.target.classList.remove("animate__animated", "animate__fadeInLeft")
                    }
                    if (entry.target.classList.contains("up")) {
                        entry.target.classList.remove("animate__animated", "animate__fadeInUp")
                    }
                }
            })
        })

        const elemtents = document.querySelectorAll(".animate")

        elemtents.forEach((element) => observe.observe(element))
    }, [])

    return (
        <main className="page-home">
            <ReactPlayer width="100vw" height="100vh" loop muted playing={true} url="https://maion-storage.nyc3.cdn.digitaloceanspaces.com/Background.mp4" />
            <section id="home" className='header'>
                <Header />
                <section className="home-description container-view animate left">
                    <span className="home-title">Recuperação Tributária Eficiente</span>
                    <br />
                    <span className="home-description">Com 12 anos de experiência, a MAION TAX
                        já recuperou mais de 500 milhões em
                        tributos para empresas, de forma rápida e segura</span>
                </section>
            </section>
            <KnowMore />
            <Services />
            <HowToWork />
            <Description />
            <Units />
            <Customers />
            <Blog />
            <footer className="container-view">
                <span>
                    2024 © Todos os Direitos Reservados | Desenvolvido com <Image className="heart-icon" src={require("@/public/images/heart.png")} alt="Heart" /> por <a href="https://plugue.me"><Image src={require("@/public/images/plugueme.png")} alt="Plugueme" /> </a>
                </span>
            </footer>
        </main>
    )
}