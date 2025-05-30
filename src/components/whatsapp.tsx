"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";

export default function WhatsApp() {
    return (
        <div
            onClick={() => {
                sendGTMEvent({
                    event: "whatsapp_button_click",
                    event_action: "click",
                    event_category: "engagement",
                    event_label: "whatsapp_button",
                    value: "https://wa.me/551142187960",
                });
            }}
            className="whatsapp"
        >
            <Link href="https://wa.me/551142187960" target="_blank">
                <Image src="/images/whatsapp.png" alt="Whatsapp" width={70} height={70} />
            </Link>
        </div>
    )
}