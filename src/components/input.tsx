
export default function Input({ multipleLine, ...rest }: any) {

    return (
        <div className="component-input">
            <div className="label">
                <p>{rest.label}</p>
            </div>
            {multipleLine ? <textarea  {...rest} /> : <input {...rest} />}
            {rest.error && <span className="error">{rest.error.message}</span>}
        </div>
    )
}