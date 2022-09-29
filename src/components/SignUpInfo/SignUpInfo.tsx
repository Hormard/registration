import styles from "./SignUpInfo.module.css"
import regParams from "../../mock/registrationParams.json"
import { useState ,useRef, FormEvent } from "react"
import { ISipnUpInfo } from "../../models/registration"

const InputMask = require('react-input-mask');

export interface ISignUpInfoProps {
    signUpInfo: ISipnUpInfo,
    onClick( newSignUpInfo: ISipnUpInfo ): void,
}

export function SignUpInfo({signUpInfo ,onClick}: ISignUpInfoProps) {

    const phone = useRef() as React.MutableRefObject<HTMLInputElement>;
    const email = useRef() as React.MutableRefObject<HTMLInputElement>;
    const password = useRef() as React.MutableRefObject<HTMLInputElement>;
    const repeatPassword = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [errorMessages, setErrormessages] = useState<string[]>([]);
    const errorMessagesRef = useRef(errorMessages);

    const onClickNext = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateWithRegEx(phone.current.value, "Mobile phone", regParams.mobilePhone.regExp);
        validateWithRegEx(email.current.value, "Email", regParams.email.regExp);
        validatePassword();
        validateRepeatPassword();
        if (errorMessagesRef.current.length === 0) {
            const newSignUpInfo = {
                mobilePhone: phone.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            onClick(newSignUpInfo);
        }  
    }

    const validateWithRegEx = (field: string, title: string, regExpStr?: string): void => {
        if (isRequiredValidate(field, regParams.email.required, title)){
            return;
        }

        if (regExpStr) {
            const regExp = new RegExp(regExpStr);
            const error = `Invalid ${title}`;

            if (regExp.test(field)) {
                errorMessagesRef.current = errorMessagesRef.current.filter(item => item !== error);
                setErrormessages(errorMessagesRef.current);
                return;
            }

            if (errorMessagesRef.current.includes(error)) {
                return;
            }
            errorMessagesRef.current = [error, ...errorMessagesRef.current];
            setErrormessages(errorMessagesRef.current);
        }
    }

    const validatePassword = () => {
        if (isRequiredValidate(password.current.value, regParams.password.required, "Password")) {
            return;
        }
        validateLength(password.current.value, regParams.password.minLength, regParams.password.maxLength, 'Password');
    }

    const validateRepeatPassword = () => {
        const error = "Passwords doesn't match";

        if (password.current.value === repeatPassword.current.value) {
            errorMessagesRef.current = errorMessagesRef.current.filter(item => item !== error);
            setErrormessages(errorMessagesRef.current);
            return;
        }

        if (errorMessagesRef.current.includes(error)) {
            return;
        }

        errorMessagesRef.current = [error, ...errorMessagesRef.current];
        setErrormessages(errorMessagesRef.current);
    }

    const isRequiredValidate = (input: string | string[], isRequired: boolean, title: string): boolean => {
        if (isRequired) {
            const error = `${title} is required`;
            if (Boolean(input) === false || input.length === 0) {

                if (errorMessagesRef.current.includes(error)) {
                    return true;
                }
                errorMessagesRef.current = [error, ...errorMessagesRef.current];
                setErrormessages(errorMessagesRef.current);
                return true;
            }

            if (errorMessagesRef.current.includes(error)) {
                errorMessagesRef.current = errorMessagesRef.current.filter(item => item !== error);
                setErrormessages(errorMessagesRef.current);
            }
        }
        return false;
    }

    const validateLength = (input: string, minLength: string, maxLength: string, title: string): void => {
        const error = `${title} must be >= ${minLength} and <= ${maxLength}`;
        if (input.length >= +minLength && input.length <= +maxLength) {
            if (errorMessagesRef.current.includes(error)) {
                errorMessagesRef.current = errorMessagesRef.current.filter(item => item !== error);
                setErrormessages(errorMessagesRef.current);
            }
            return;
        }

        if (errorMessagesRef.current.includes(error)) {
            return;
        }
        errorMessagesRef.current = [error, ...errorMessagesRef.current];
        setErrormessages(errorMessagesRef.current);
    }

    return <form onSubmit={e => onClickNext(e)}>
        <div className={styles.container}>
            <label className={styles.label}>Mobile phone</label>
            <InputMask
                className={styles.input}
                mask="+375999999999"
                alwaysShowMask
                ref={phone}
            />
        </div>

        <div className={styles.container}>
            <label className={styles.label}>Email</label>
            <input 
                className={styles.input} 
                type="email" 
                defaultValue={signUpInfo.email}
                ref={email}
            />
        </div>

        <div className={styles.container}>
            <label className={styles.label}>Password</label>
            <input 
                className={styles.input} 
                type="password"
                defaultValue={signUpInfo.password} 
                ref={password}
            />
            <p className={styles.clue}>Min symbols: {regParams.password.minLength}</p>
        </div>

        <div className={styles.container}>
            <label className={styles.label}>Repeat password</label>
            <input 
                className={styles.input} 
                type="password"
                ref={repeatPassword}
            />
        </div>

        {errorMessagesRef.current.map((item, id) => 
            <p className={styles.error} key={id}>{item}</p>
        )
        }

        <button className={styles.button} type="submit">Next</button>
    </form>
}