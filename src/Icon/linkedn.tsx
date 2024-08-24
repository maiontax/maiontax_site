import { IconType } from "./icon.type";


export default function Icon_Linkedn({ fill = "#ffffff" }: IconType) {
    return (
        <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M192 192H280.553V237.391H281.819C294.139 215.294 324.298 192 369.24 192C462.713 192 480 250.188 480 325.867V480H387.695V343.361C387.695 310.769 387.028 268.848 339.681 268.848C291.607 268.848 284.271 304.341 284.271 340.994V480H192V192Z" fill={fill} />
            <path d="M32 192H128V480H32V192Z" fill={fill} />
            <path d="M128 112C128 138.51 106.51 160 80 160C53.49 160 32 138.51 32 112C32 85.49 53.49 64 80 64C106.51 64 128 85.49 128 112Z" fill={fill} />
        </svg>
    )
}