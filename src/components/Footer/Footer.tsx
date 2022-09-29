import { LogoSvg } from "../../assets/svg/LogoSvg"
import styles from "./Footer.module.css"

export function Footer(){

    return <div className={styles.container}>
        <p className={styles.text}>Powered by Evgeeen</p>
        <LogoSvg/>
        <a  className={styles.link} href="https://github.com/Hormard" target='blank'>GitHub:3</a>
    </div>
}