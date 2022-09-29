import { FormEvent, useRef, useState } from "react";
import styles from "./PersonalInfo.module.css"
import regParams from "../../mock/registrationParams.json"
import { IPersonalInfo } from "../../models/registration";

export interface IPersonalInfoProps {
    personalInfo: IPersonalInfo,
    onClickReturn(): void,
    onClickComplete(newPersonalInfo: IPersonalInfo): void,
}

export function PersonalInfo({personalInfo ,onClickReturn, onClickComplete}: IPersonalInfoProps) {

    const [firstName, setFirstName] = useState(personalInfo.firstName);
    const [lastName, setLastName] = useState(personalInfo.lastName);
    const [sex, setSex] = useState(personalInfo.sex);
    const [birthday, setBirthday] = useState(personalInfo.birthday);
    const [ocean, setOcean] = useState(personalInfo.ocean);
    const [hobby, setHobby] = useState<string[]>(personalInfo.hobby);
    const [errorMessages, setErrormessages] = useState<string[]>([]);
    const errorMessagesRef = useRef(errorMessages);

    const onchangeHobby = (newHobby: string): void => {
        let updatedHobby: string[];

        if (hobby.includes(newHobby)) {
            updatedHobby = hobby.filter((item: string) => item !== newHobby);
        } else {
            updatedHobby = [newHobby, ...hobby];
        }

        setHobby(updatedHobby);  
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        validateFirstName();
        validateLastName();
        isRequiredValidate(sex, regParams.sex.required, "Sex");
        validateBirthday(regParams.birthday.minAge, regParams.birthday.maxAge);
        isRequiredValidate(ocean, regParams.ocean.required, "Favorite ocean");
        isRequiredValidate(hobby, regParams.hobby.required, "Hobby");
        if (errorMessagesRef.current.length === 0) {
            const newPersonalInfo = {
                firstName: firstName,
                lastName: lastName,
                sex: sex,
                birthday: birthday,
                ocean: ocean,
                hobby: hobby,
            }
            onClickComplete(newPersonalInfo);
        }     
    }

    const isRequiredValidate = (input: string | string[], isRequired: boolean, title: string): boolean => {
        if (isRequired) {
            const error = `${title} is required`;
            if (Boolean(input) === false || input.length === 0) {

                if (errorMessages.includes(error)) {
                    return true;
                }
                errorMessagesRef.current = [error, ...errorMessagesRef.current];
                setErrormessages(errorMessagesRef.current);
                return true;
            }

            if (errorMessages.includes(error)) {
                errorMessagesRef.current = errorMessagesRef.current.filter(item => item !== error);
                setErrormessages(errorMessagesRef.current);
            }
        }
        return false;
    }

    const validateLength = (input: string, minLength: string, maxLength: string, title: string): void => {
        const error = `${title} must be >= ${minLength} and <= ${maxLength}`;
        if (input.length >= +minLength && input.length <= +maxLength) {
            if (errorMessages.includes(error)) {
                errorMessagesRef.current = errorMessagesRef.current.filter(item => item !== error);
                setErrormessages(errorMessagesRef.current);
            }
            return;
        }

        if (errorMessages.includes(error)) {
            return;
        }

        errorMessagesRef.current = [error, ...errorMessagesRef.current];
        setErrormessages(errorMessagesRef.current);
    }

    const validateFirstName = (): void => {
        if (isRequiredValidate(firstName, regParams.firstName.required, 'First name')) {
            return;
        }
        validateLength(firstName, regParams.firstName.minLength, regParams.firstName.maxLength, 'First name');
    }

    const validateLastName = (): void => {
        if (isRequiredValidate(lastName, regParams.lastName.required, 'Last name')) {
            return;
        }
        validateLength(lastName, regParams.lastName.minLength, regParams.lastName.maxLength, 'Last name');
    }

    const validateBirthday = (minAge: string, maxAge: string,): void => {
        isRequiredValidate(birthday, regParams.birthday.required, 'Birthday');
    
        let birthdayDate = new Date(birthday);
        let minAgeDate = new Date();
        let maxAgeDate = new Date();
        
        minAgeDate.setFullYear(minAgeDate.getFullYear() - Number(minAge));
        maxAgeDate.setFullYear(maxAgeDate.getFullYear() + Number(maxAge));

        const error = `Max age: ${regParams.birthday.maxAge} Min age: ${regParams.birthday.minAge}`

        if (birthdayDate > minAgeDate && birthdayDate < maxAgeDate) {
            if (errorMessages.includes(error)) {
                return;
            }
            errorMessagesRef.current = [error, ...errorMessagesRef.current];
            setErrormessages(errorMessagesRef.current);
        }

        if (errorMessages.includes(error)) {
            errorMessagesRef.current = errorMessages.filter(item => item !== error);
            setErrormessages(errorMessagesRef.current);
        }
    }

    return <form onSubmit={e => onSubmit(e)}>
        <div className={styles.container}>
            <label className={styles.label}>First name</label>
            <input 
                className={styles.input} 
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
        </div>

        <div className={styles.container}>
            <label className={styles.label}>Last name</label>
            <input 
                className={styles.input} 
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
        </div>

        <div className={styles.container}>
            <label className={styles.label}>Sex</label>
            <div className={styles.radio_container}>
                <div>
                    <input 
                        className={styles.input_radio} 
                        id="male" 
                        type="radio" 
                        name="sex" 
                        value="male" 
                        onChange={e => setSex(e.target.value)}
                    />
                    <label className={styles.label} htmlFor="male">Male</label>
                </div>

               <div>
                    <input 
                        className={styles.input_radio} 
                        id="female" 
                        type="radio" 
                        name="sex" 
                        value="female" 
                        onChange={e => setSex(e.target.value)}
                    />
                    <label className={styles.label} htmlFor="female">Female</label>
               </div>
            </div>
        </div>

        <div className={styles.container}>
            <label className={styles.label}>Birthday</label>
            <input 
                className={styles.input} 
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
            />
        </div>

        <div className={styles.container}>
            <label className={styles.label}>Your favorite ocean</label>
            <select value={ocean} onChange={e => setOcean(e.target.value)}>
                <option value="">Not choosen</option>
                {regParams.ocean.oneOf.map((item, id) => 
                    <option key={id}  value={item}>{item}</option>
                )}
            </select>
        </div>

        <div className={styles.container}>
            <label className={styles.label}>Hobby</label>
            {regParams.hobby.anyOf.map((item, id) => 
                <div className={styles.checkbox_container} key={id}>
                    <label>{item}</label>
                    <input 
                        name="hobby" 
                        type="checkbox" 
                        value={item}
                        onChange={() => onchangeHobby(item)}
                        
                     />
                </div>
            )}
        </div>

        {errorMessagesRef.current.length > 0 ? errorMessagesRef.current.map((item, id) => 
            <p className={styles.error} key={id}>{item}</p>
        ) : null
        }

        <div className={styles.buttons}>
            <button className={styles.button} type="button" onClick={onClickReturn}>Change SignUp Information</button>
            <button className={styles.button} type="submit">Complete</button>
        </div>
    </form>
}