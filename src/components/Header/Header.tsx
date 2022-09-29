import { LogoSvg } from "../../assets/svg/LogoSvg"
import styles from "./Header.module.css"

export function Header(){

    return <div className={styles.container}>
        <LogoSvg/>
        <h1 className={styles.title}>Best App</h1>
    </div>
}