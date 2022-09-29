import { useState } from "react"
import { Modal } from "../components/Modal/Modal"
import { PersonalInfo } from "../components/PersonalInfo/PersonalInfo"
import { SignUpInfo } from "../components/SignUpInfo/SignUpInfo"
import { IPersonalInfo, ISipnUpInfo } from "../models/registration"
import { useAppDispatch, useAppSelector } from "../store/hooks/redux-hooks"
import { addPersonalInfo, addSignInfo } from "../store/reducers/registrationSlice"

export function RegistrationPage() {
    const [breadcrumbs, setBreadcrumbs] = useState("SignUpInfo" || "PersonalInfo");
    const [isCompleted, setIsCompleted] = useState(false);

    const registrationInfo = useAppSelector(state => state.registration.user);
    const dispatch = useAppDispatch();

    const onClickNext = ( newSignUpInfo: ISipnUpInfo ): void => {
        dispatch(addSignInfo(newSignUpInfo));
        setBreadcrumbs("PersonalInfo");
    }

    const onClickReturn = (): void => {
        setBreadcrumbs("SignUpInfo");
    }

    const onClickComplete = (newPersonalInfo: IPersonalInfo): void => {
        dispatch(addPersonalInfo(newPersonalInfo));
        setIsCompleted(true)
    }

    return <div className="flex flex-col items-center">
        <h1 className="pt-5 text-2xl font-bold font-['Oswald']">{breadcrumbs}</h1>
        <div className="pt-7 flex flex-col items-center">
            {breadcrumbs === "SignUpInfo" ? 
                <SignUpInfo 
                    signUpInfo={registrationInfo.signUpInfo}
                    onClick={onClickNext}
                />
                : 
                <PersonalInfo 
                    personalInfo={registrationInfo.personalInfo}
                    onClickReturn={onClickReturn}
                    onClickComplete={onClickComplete}
                />}
        </div>
        {isCompleted ? <Modal registrationInfo={registrationInfo}></Modal> : null}
    </div>
}