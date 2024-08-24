import Image from "next/image";
import Title from "./title";

const units = [
  {
    title: "Paulista - SP",
    address: "Avenida Paulista, 2202, Cj 61 A1 - Bela Vista - SP",
    district: "Bela Vista",
    zipcode: "01310 - 932",
    phone: "+55 11 42187960"
  },
  {
    title: "Pinheiros - SP",
    address: "Rua Amaro Cavalheiro, 347 - Pinheiros - SP",
    district: "Pinheiros",
    zipcode: "05425-011",
    phone: "+55 11 42187960",
    is_default: true
  },
  {
    title: "Arujá - SP",
    address: "Avenida João Manoel, 600, Torre A, 1006, Centro, Arujá - SP",
    district: "Arujá",
    zipcode: "07432 - 575",
    phone: "+55 11 42187960"
  },
]

export default function Units() {
  return (
    <section className="component-units container-view">
      <Title title="Unidades" type="secondary" />
      <div className="container-units">
        <div className="component-units-items animate up">
          {units.map((unit, index) => (
            <div key={index} className="unit">
              <h2>{unit.title}</h2>
              <div className="unit-info">
                <div className="unit-info-item">
                  <Image width={20} src={require("@/public/images/heart.png")} alt="Icon" />
                  <p>{unit.address}</p>
                </div>
                <div className="unit-info-item">
                  <Image width={20} src={require("@/public/images/heart.png")} alt="Icon" />
                  <p>{unit.district}</p>
                </div>
                <div className="unit-info-item">
                  <Image width={20} src={require("@/public/images/heart.png")} alt="Icon" />
                  <p>{unit.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="patners animate left">
          <h2>Fazem parte do grupo Maion Tax</h2>
          <div className="patners-items">
            <div className="patner">
              <Image width={250} src={require("@/public/images/logo.png")} alt="Logo" />
            </div>
            <div className="patner">
              <Image width={250} src={require("@/public/images/maiontech.png")} alt="Logo" />
            </div>
            <div className="patner">
              <Image width={250} src={require("@/public/images/maionfranchising.png")} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
