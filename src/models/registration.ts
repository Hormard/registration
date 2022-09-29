export interface IUser {
    signUpInfo: ISipnUpInfo,
    personalInfo: IPersonalInfo
}

export interface ISipnUpInfo {
    mobilePhone: string,
    email: string,
    password: string
}

export interface IPersonalInfo {
    firstName: string,
    lastName: string,
    sex: string,
    birthday: string,
    ocean: string,
    hobby: string[],
}