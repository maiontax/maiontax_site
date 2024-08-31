"use client"

import React, { useEffect } from "react"

export default function Altcha(props: Configure) {
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/npm/altcha/dist/altcha.min.js"
        script.async = true
        script.defer = true
        script.type = "module"
        document.head.appendChild(script)

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    return <altcha-widget
        challengeurl={`${BASE_URL}/site/captcha/challenge`}
        verifyurl={`${BASE_URL}/site/captcha/verify`}
        {...props}></altcha-widget>
}



import { type DOMAttributes } from "react"
import { BASE_URL } from "../config/general"

export interface Strings {
    error: string
    expired: string
    footer: string
    label: string
    verified: string
    verifying: string
    waitAlert: string
}

export interface Configure {
    auto?: "onfocus" | "onload" | "onsubmit"
    challenge?: Challenge
    challengeurl?: string
    debug?: boolean
    expire?: number
    autorenew?: boolean
    hidefooter?: boolean
    hidelogo?: boolean
    maxnumber?: number
    mockerror?: boolean
    name?: string
    refetchonexpire?: boolean
    spamfilter?: boolean
    strings?: Partial<Strings>
    test?: boolean | number
    verifyurl?: string
    workers?: number
    floating?: boolean
}

export interface Challenge {
    algorithm: string
    challenge: string
    maxnumber?: number
    salt: string
    signature: string
}

// export interface SpamFilter {
//   email?: string | false
//   expectedLanguages?: string[]
//   expectedCountries?: string[]
//   fields?: string[] | false
//   ipAddress?: string | false
//   timeZone?: string | false
// }

// export interface ServerVerificationPayload {
//   email?: string
//   expectedCountries?: string[]
//   expectedLanguages?: string[]
//   fields?: Record<string, string>
//   ipAddress?: string
//   payload: string
//   timeZone?: string
// }

// export interface Solution {
//   number: number
//   took: number
//   worker?: boolean
// }

// export interface Payload {
//   algorithm: string
//   challenge: string
//   number: number
//   salt: string
//   signature: string
//   test?: boolean
//   took: number
// }

// export enum State {
//   ERROR = "error",
//   VERIFIED = "verified",
//   VERIFYING = "verifying",
//   UNVERIFIED = "unverified",
//   EXPIRED = "expired",
// }

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["altcha-widget"]: CustomElement<Configure>
        }
    }
}
