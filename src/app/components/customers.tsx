import Image from "next/image"
import Title from "./title"

const customers = [
    require("@/public/images/customer-1.png"),
    require("@/public/images/customer-2.png"),
    require("@/public/images/customer-3.png"),
    require("@/public/images/customer-4.png"),
    require("@/public/images/customer-5.png"),
    require("@/public/images/customer-6.png"),
    require("@/public/images/customer-7.png"),
    require("@/public/images/customer-8.png"),
    require("@/public/images/customer-9.png"),
    require("@/public/images/customer-10.png"),
    require("@/public/images/customer-11.png"),
    require("@/public/images/customer-12.png"),
    require("@/public/images/customer-13.png"),
    require("@/public/images/customer-14.png"),
]

export default function Customers() {
    return (
        <section className="component-customers container-view">
            <Title size={40} title="Conheça alguns de nossos clientes" type="secondary" border={false} />
            <div className="customers-container">
                {customers.map((customer, index) => (
                    <Image src={customer} key={index} alt="Logo" />
                ))}
            </div>
        </section>
    )
}