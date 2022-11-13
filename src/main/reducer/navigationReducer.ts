import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../app/store';
import NavigationActionTypes from "../constants/actions/navigationActionTypes";

interface PageAttributesType{
    isActive: boolean
}

export interface NavigationInformationType{
    homePage: PageAttributesType,
    userProfilePage: PageAttributesType
}

interface NavigatationStateType{
    navigationInformation: NavigationInformationType
}

const initialState: NavigatationStateType = {
    navigationInformation:{
        homePage:{
            isActive: true
        },
        userProfilePage:{
            isActive: false
        }
    }
}

const navigationSlice = createSlice({
    name: NavigationActionTypes.NAVIGATION_SLICE,
    initialState,
    reducers: {
        setActivePage: (state, action: PayloadAction<NavigationInformationType>)=>{
            console.log("Action: ", action)
            state.navigationInformation = action.payload
        }
    }
})

export const {setActivePage} = navigationSlice.actions

export const selectNavigationInformation = (state: RootState) =>{
    console.log("Select active pages state: ", state)
    return state.navigation.navigationInformation
}

export default navigationSlice.reducer;