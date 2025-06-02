'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const sendPageview = () => {
            // Constrói a URL corretamente, apenas adicionando search params se existirem
            const searchString = searchParams.toString();
            const url = searchString ? `${pathname}?${searchString}` : pathname;

            console.log('PageTracker - Iniciando para URL:', url);

            // Função para verificar se o GTM está carregado
            const checkGTMLoaded = () => {
                const hasDataLayer = !!window.dataLayer;
                const hasGTM = !!window.google_tag_manager;
                console.log('GTM Status:', { hasDataLayer, hasGTM });
                return hasDataLayer; // Apenas verificar dataLayer pode ser suficiente
            };

            // Função para enviar o evento
            const pushEvent = () => {
                window.dataLayer = window.dataLayer || [];

                const eventData = {
                    event: 'pageview',
                    page_path: url,
                    page_title: document.title,
                    page_location: window.location.href
                };

                window.dataLayer.push(eventData);

                console.log('GTM Pageview enviado com sucesso:', eventData);
            };

            // Se o GTM já estiver carregado, envia imediatamente
            if (checkGTMLoaded()) {
                console.log('GTM já carregado, enviando pageview imediatamente');
                pushEvent();
            } else {
                console.log('GTM não carregado, aguardando...');
                // Caso contrário, aguarda até que esteja carregado
                let attempts = 0;
                const maxAttempts = 50; // 5 segundos no máximo

                const interval = setInterval(() => {
                    attempts++;
                    console.log(`Tentativa ${attempts}/${maxAttempts} de verificar GTM`);

                    if (checkGTMLoaded() || attempts >= maxAttempts) {
                        clearInterval(interval);
                        if (attempts >= maxAttempts) {
                            console.warn('GTM não carregou a tempo, enviando pageview mesmo assim');
                        }
                        pushEvent();
                    }
                }, 100);
            }
        };

        // Pequeno delay para garantir que a página está totalmente carregada
        const timer = setTimeout(sendPageview, 200);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return null;
}
