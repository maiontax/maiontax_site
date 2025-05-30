"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";

export default function WhatsApp() {
    return (
        <div
            onClick={() => {
                sendGTMEvent({
                    event: "click_phone_button",
                    event_category: "engagement",
                    event_label: "phone_button",
                    value: 1,
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