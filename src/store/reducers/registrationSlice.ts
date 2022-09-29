import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonalInfo, ISipnUpInfo, IUser } from "../../models/registration";
import { RootState } from "../store";

export interface IUserState {
    user: IUser
}

const initialState: IUserState = {
    user: {  
        signUpInfo: {
            mobilePhone: '',
            email: '',
            password: '',
        },
        personalInfo: {
            firstName: '',
            lastName: '',
            birthday: '',
            ocean: '',
            hobby: [],
            sex: '',
        }
    }
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        addSignInfo(state, { payload }: PayloadAction<ISipnUpInfo>) {
           state.user = {...state.user, signUpInfo: payload }
        },

        addPersonalInfo(state, { payload }: PayloadAction<IPersonalInfo>) {
            state.user = {...state.user, personalInfo: payload}
        }
    },
    
  });

  export const { addSignInfo, addPersonalInfo } = registrationSlice.actions

  export const selectCount = (state: RootState) => state.registration.user
  
  export default registrationSlice.reducer;

