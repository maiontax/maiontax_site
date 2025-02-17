"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        import("react-facebook-pixel")
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init("935977824448600");
                ReactPixel.pageView();
            });
    }, [pathname, searchParams]);

    return null;
};
