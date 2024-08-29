import { useState } from "react"

export default function Input({ multipleLine, register, ...rest }: any) {
    return (
        <div className="component-input">
            <div className="label">
                <p>{rest.label}</p>
            </div>
            {multipleLine ? <textarea {...register} {...rest} /> : <input {...register} {...rest} />}
            {rest.error && <span className="error">{rest.error.message}</span>}
        </div>
    )
}