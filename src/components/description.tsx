import Image from "next/image"

export default function Description() {
    return (
        <section className="component-description container-view">
            <div className="description-franchisee animate left">
                <h1>O maior honorário<br />do mercado</h1>
                <span>Valorização dos associados e parceiros através da proximidade, ética e liderança com foco em resultados.</span>
            </div>
            <div className="description-information animate right">
                <Image src={require("@/public/images/graph-icon.png")} alt="Icon" />
                <h1>+500M</h1>
                <span>mais de 500M de<br />reais recuperados</span>
            </div>
            <div className="description-information animate right">
                <Image src={require("@/public/images/company-icon.png")} alt="Icon" />
                <h1>+1000</h1>
                <span>mais de 1000<br />empresas parceiras</span>
            </div>
        </section>
    )
}