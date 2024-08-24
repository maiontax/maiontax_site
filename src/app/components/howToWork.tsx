import Image from "next/image";
import { useEffect } from "react";

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Title from "./title";

const timelineData = [
  {
    title: 'Aceite do contrato pela empresa',
    items: [
      'Reunião institucional com a empresa',
      'Recebimento do contrato social para confecção da proposta',
      'Assinatura da proposta com a empresa',
    ],
    icon: require("@/public/images/agreement.png")
  },
  {
    title: 'Coleta da documentação',
    items: [
      'Recebimento dos contatos dos responsáveis pelo projeto',
      'Preparação dos dados para input na ferramenta da MAION TAX Soluções',
      'RH/Departamento pessoal: Folha de pagamento',
      'Fiscal/Contábil: Controles e obrigações acessórias',
    ],
    icon: require("@/public/images/paper.png")
  },
  {
    title: 'Análise de oportunidades',
    items: [
      'Input dos dados na Ferramenta para cruzamento de informações',
      'Realização de análises detalhadas para identificação das inconsistências',
      'Constatação das oportunidades',
    ],
    icon: require("@/public/images/loupe.png")
  },
  {
    title: 'Apresentação das oportunidades mapeadas',
    items: [
      'Reunião com as áreas jurídicas, tributárias da EMPRESA para apresentação dos benefícios encontrados',
      'Definição da estratégia de implementação das ações',
      'Elaboração de cronograma detalhado para Implementação das ações (compensação/restituição)',
    ],
    icon: require("@/public/images/slides.png")
  },
  {
    title: 'Reativação dos créditos (restituição/compensação)',
    items: [
      'Implementação das ações para reativação dos créditos mediante cumprimento das obrigações',
      'Acompanhamento das devidas etapas pela equipe Maion Tax Soluções',
    ],
    icon: require("@/public/images/money-bag.png")
  },
];


export default function HowToWork() {
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
    <section id="howtoworks" className="component-howtowork">
      <Title title="Como funciona" type="secondary" />
      <div className="timeline-container">
        <div className="timeline">
          {timelineData.map((element, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-icon">
                <Image width={40} height={40} src={element.icon} alt="Test" />
              </div>
              <div className={`timeline-item-content animate ${index % 2 === 0 ? "left" : "right"}`} style={{ float: index % 2 !== 0 ? "right" : "unset" }}>
                <h3 className="vertical-timeline-element-title">{element.title}</h3>
                <ul>
                  {element.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}