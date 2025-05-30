'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import PhoneIcon from "@/public/images/phone.svg";
import LinkednIcon from "@/public/images/linkedin.svg";
import InstagramIcon from "@/public/images/instagram.svg";
import { sendGTMEvent } from '@next/third-parties/google'

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [theme, setTheme] = useState("transparent");
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        setTheme(pathname !== "/" ? "white" : "transparent");

        const handleScroll = () => {
            const sections = ['services', 'howtoworks', 'faleconosco'];
            let foundActiveSection = false;

            for (let i = 0; i < sections.length; i++) {
                const section = document.getElementById(sections[i]);

                if (section) {
                    const sectionTop = section.offsetTop - 100;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                        setActiveSection(sections[i]);
                        foundActiveSection = true;
                        break;
                    }
                }
            }

            if (!foundActiveSection) {
                setActiveSection(null);
            }
        };

        if (pathname === "/") {
            window.addEventListener('scroll', handleScroll);
        }

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [window.location.pathname]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();

        if (pathname !== "/") {
            router.push(`/#${targetId}`);
        } else {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const menuElement = document.querySelector('.menu') as HTMLElement;
                window.scrollTo({
                    top: targetElement.offsetTop - menuElement.offsetHeight + 20,
                    behavior: 'smooth'
                });
            }
        }
    };

    if (theme === null) {
        return null;
    }

    const onShowMenu = () => {
        const menu = document.querySelector('.menu') as HTMLElement;
        menu.classList.toggle('hide');
    };

    return (
        <header className={`component-header container-view ${theme}`}>
            {theme === "transparent" && pathname === "/" && (
                <div className='contact-container'>
                    <Link onClick={() => {
                        sendGTMEvent({
                            event: "click_phone_button",
                            event_action: "click",
                            event_category: "engagement",
                            event_label: "phone_button",
                            value: "+55(11)4655-2230",
                        });
                    }}
                        href="tel:1146552230"
                        className="cellphone-button"
                    >
                        <Image className="icon-cell" src={require("@/public/images/phone.svg")} alt='Phone' />
                        <span>+55(11)4655-2230</span>
                    </Link>

                    <div className='social-container'>
                        <Link target='_blank' className="icon-social" href="https://www.linkedin.com/company/maion-tax-solu-es-tribut-rias-e-corporativas/posts/?feedView=all">
                            <Image color='#fff' src={require("@/public/images/linkedin.svg")} alt='Linkedn' />
                        </Link>
                        <Link target='_blank' className="icon-social" href="https://www.instagram.com/maiontax/">
                            <Image color='#fff' src={require("@/public/images/instagram.svg")} alt='Instagram' />
                        </Link>
                    </div>
                </div>
            )}
            <div className='menu-container'>
                <Image
                    src={require("@/public/images/logo.png")}
                    alt="Logo"
                />
                <div className='menu-icon' onClick={onShowMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <ul className='menu'>
                    <div className='menu-icon-close' onClick={onShowMenu}>
                        <div></div>
                        <div></div>
                    </div>
                    <li>
                        <Link className={pathname === "/" ? 'active' : ''} href="/">INÍCIO</Link>
                    </li>
                    <li>
                        <a className={activeSection === 'services' ? 'active' : ''} href="#services" onClick={(e) => handleClick(e, 'services')}>SERVIÇOS</a>
                    </li>
                    <li>
                        <a className={activeSection === 'howtoworks' ? 'active' : ''} href="#howtoworks" onClick={(e) => handleClick(e, 'howtoworks')}>COMO FUNCIONA</a>
                    </li>
                    <li>
                        <a className={pathname === '/faleconosco' ? 'active' : ''} href="/faleconosco">FALE CONOSCO</a>
                    </li>
                    <li>
                        <Link className={pathname === "/blog" ? 'active' : ''} href="/blog">BLOG</Link>
                    </li>
                    <li>
                        <Link className={pathname === "/trabalhe-conosco" ? 'active' : ''} href="/trabalhe-conosco">TRABALHE CONOSCO</Link>
                    </li>
                    <li>
                        <Link className={pathname === "/crm" ? 'active' : ''} href="https://maiontech.com.br">CRM</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
