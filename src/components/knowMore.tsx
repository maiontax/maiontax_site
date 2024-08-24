import Button from "./button";

export default function KnowMore() {
    return (
        <section className="component-know-more">
            <div className="know-more-image-container">
                <div className="know-more-square animate left"></div>
                <div className="know-more-image animate left"></div>
            </div>
            <section className="know-more-description animate right">
                <span className="know-more-title">Excelência em Compliance Fiscal<br />
                    Auditoria e Revisão Tributária</span>
                <br />
                <span className="know-more-description">A MAION TAX atua no compliance fiscal, auditoria e revisão de obrigações
                    acessórias,<br /> identificando oportunidades não aproveitadas
                    e gerando caixa imediato para empresas</span>
                <br />
                <div className="know-more-button">
                    <Button title='Saiba mais' link="#howtoworks" />
                </div>
            </section>
        </section>
    )
}