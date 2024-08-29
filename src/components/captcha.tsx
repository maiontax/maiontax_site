import { Altcha } from "react-altcha";
import { BASE_URL } from "../config/general";
import altcha_strings from "../config/altcha_strigs.json";

export default function Captcha() {
    return (
        <Altcha
            challengeurl={`${BASE_URL}/site/captcha/challenge`}
            verifyurl={`${BASE_URL}/site/captcha/verify`}
        />
    )
}