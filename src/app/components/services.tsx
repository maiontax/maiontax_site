import { useEffect } from "react"
import Title from "./title"

type ICardItem = {
    title: string
    description: string
    confirmation: string
}


const services = [
    {
        title: "Créditos de INSS",
        description: "Análise da folha de pagamento para identificar oportunidades referentes às verbas indenizatórias e contribuições previdenciárias.",
        confirmation: "✓ Empresas do lucro real e presumido"
    },
    {
        title: "PIS e COFINS",
        description: "Análise de créditos com base na essencialidade e relevância das despesas e insumos da empresa.",
        confirmation: "✓ Empresas do lucro real"
    },
    {
        title: "Simples Nacional",
        description: "Restituição de créditos por bitributação de PIS e COFINS monofásicos.",
        confirmation: "✓ Autopeças, farmácias, mercados, petshops, etc."
    },
    {
        title: "Exclusão de ICMS",
        description: "Ajuda na adequação da base de faturamento para aplicação do PIS e COFINS e recuperação dos valores pagos a maior dos últimos cinco anos.",
        confirmation: "✓ Empresas do lucro real e presumido"
    },
    {
        title: "E-Credac",
        description: "Validação e homologação de créditos acumulados de ICMS nos portais da Fazenda estadual.",
        confirmation: "✓ Empresas do lucro real e presumido"
    },
    {
        title: "Dívida Ativa",
        description: "Consulta, due diligence e negociação de débitos inscritos em dívida ativa, com descontos de até 70% e parcelamento em até 145 meses.",
        confirmation: "✓ Empresas do lucro real, presumido e simples nacional"
    },
]

export default function Services() {
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

        const elemtents = document.querySelectorAll(".services-container-cards")

        elemtents.forEach((element) => observe.observe(element))
    }, [])

    return (
        <section id="services" className="component-services container-view">
            <Title title="Nossos serviços" />
            <div className="services-container-cards">
                {
                    services.map((props, index) => <CardItem {...props} key={index} />)
                }
            </div>
        </section>
    )
}

const CardItem = ({ confirmation, title, description }: ICardItem) => {
    return (
        <div className="services-card">
            <h3 className="services-card-title">{title}</h3>
            <p className="services-card-description">{description}</p>
            <p className="services-card-confirmation">{confirmation}</p>
        </div>
    )
}