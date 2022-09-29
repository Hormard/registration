import { IUser } from '../../models/registration'
import styles from './Modal.module.css'

export interface IModalProps {
    registrationInfo: IUser
}

export function Modal({registrationInfo}: IModalProps) {
    return <div className={styles.wrap}>
        <div className={styles.container}>
            <h1 className={styles.title}>Regrisration complete</h1>
            <div className={styles.info_container}>
                <h2 className={styles.info_title}>First name:</h2>
                <p className={styles.info_text}>{registrationInfo.personalInfo.firstName}</p>
            </div>

            <div className={styles.info_container}>
                <h2 className={styles.info_title}>Last name:</h2>
                <p className={styles.info_text}>{registrationInfo.personalInfo.lastName}</p>
            </div>

            
            <div className={styles.info_container}>
                <h2 className={styles.info_title}>Sex:</h2>
                <p className={styles.info_text}>{registrationInfo.signUpInfo.password}</p>
            </div>

            <div className={styles.info_container}>
                <h2 className={styles.info_title}>Birthday:</h2>
                <p className={styles.info_text}>{registrationInfo.personalInfo.birthday}</p>
            </div>

            <div className={styles.info_container}>
                <h2 className={styles.info_title}>Email:</h2>
                <p className={styles.info_text}>{registrationInfo.signUpInfo.email}</p>
            </div>

            
            <div className={styles.info_container}>
                <h2 className={styles.info_title}>Mobile phone:</h2>
                <p className={styles.info_text}>{registrationInfo.signUpInfo.mobilePhone}</p>
            </div>

            <div className={styles.info_container}>
                <h2 className={styles.info_title}>Password:</h2>
                <p className={styles.info_text}>{registrationInfo.signUpInfo.password}</p>
            </div>

            
            <div className={styles.info_container}>
                <h2 className={styles.info_title}>Favorite ocean:</h2>
                <p className={styles.info_text}>{registrationInfo.personalInfo.ocean}</p>
            </div>

            <div className={styles.info_container}>
                <h2 className={styles.info_title}>Hobby:</h2>
                <div className={styles.hobby_container}>
                    {registrationInfo.personalInfo.hobby.map((item, id) => 
                        <p key={id} className={styles.hobby_text}>{item}</p>
                    )}
                </div>
            </div>
        </div>
    </div>
}