'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + searchParams.toString();

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'pageview',
            page_path: url,
        });
    }, [pathname, searchParams]);

    return null;
}
