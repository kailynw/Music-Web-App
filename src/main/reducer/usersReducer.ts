import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import UsersActionTypes from "../constants/actions/usersActionTypes";
import { Nullable } from "../types/generalTypes"
import { SongType } from "./songsReducer";
import { User } from "@auth0/auth0-react";
import UserEndpoints from "../constants/endpoints/userEndpoints";

interface UserLoginThunkPropsType {
    accessToken: string
    userData: any
}

interface EditUserProfileThunkPropsType {
    accessToken: Nullable<string>
    userId: number
    editUserProfilePayload: EditUserProfilePayload
}


export interface EditUserProfilePayload {
    userName: Nullable<string>
    bio: Nullable<string>
    instagramUrl: Nullable<string>
    profilePictureUrl: Nullable<string>
}

interface UsersStateType {
    userAlreadyRegistered: boolean
    userAccessToken: string | null
    userInfo: Nullable<UserType>
}
export interface UserType {
    userId: number
    userName: string
    numberOfFollowing: number
    numberOfFollowers: number
    bio: Nullable<string>
    instagramUrl: Nullable<string>
    profilePictureUrl: string
    createdDate: string
    songList: Nullable<Array<SongType>>
    email: string
    numberOfLogins: number
}



const initialState: UsersStateType = {
    userAlreadyRegistered: false,
    userAccessToken: null,
    userInfo: null
}

export const getUserById = createAsyncThunk(UsersActionTypes.FETCH_USER_BY_ID, async (userId: string | undefined) => {
    const getUserByIdEndpoint = `${UserEndpoints.GET_USERS}/${userId}`
    const response = await axios.get(getUserByIdEndpoint)
    console.log(response)
    return response.data;
})


export const loginUser = createAsyncThunk(UsersActionTypes.LOGIN_USER, 
    async({accessToken,userData}: UserLoginThunkPropsType)=>{
        console.log("LOGIN TRIGGERRRRREEDDDDDD")
        const loginUserEndpoint = `${UserEndpoints.LOGIN_USER}`
        const postData = {
            email: userData.email,
            profiilePictureUrl: userData.picture
        }
        const requestConfig = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
        console.log("token: ", {accessToken})
        const response = await axios.post(loginUserEndpoint, postData, requestConfig)
        console.log(response)
        return response.data;
})

interface testProps{
    editUserProfilePayload: string
    hello: string
}
export const editUserProfile = createAsyncThunk(UsersActionTypes.EDIT_USER_PROFILE, 
    async({userId, accessToken, editUserProfilePayload}:EditUserProfileThunkPropsType)=>{
        const editUserProfileEndpoint = `${UserEndpoints.EDIT_USER_PROFILE(userId)}`
        const postData = {...editUserProfilePayload}
        const requestConfig = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
        console.log("token: ", {accessToken})
        const response = await axios.post(editUserProfileEndpoint, postData, requestConfig)
        console.log(response)
        return response.data;


})

const userSlice = createSlice({
    name: UsersActionTypes.USERS_SLICE,
    initialState,
    reducers: {
        setUserAccessToken: (state, action: PayloadAction<string>)=>{
            state.userAccessToken = action.payload
        },
        setUserAlreadyRegistered: (state, action: PayloadAction<boolean>)=>{
            state.userAlreadyRegistered = action.payload
        },
        logoutUser: (state)=>{
            state.userInfo = null
            state.userAccessToken = null
            state.userAlreadyRegistered = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserType>) => {
                console.log("login User payload: ", action.payload)
                state.userInfo = action.payload
            })
            .addCase(editUserProfile.fulfilled, (state, action: PayloadAction<UserType>)=>{
                console.log("edit User payload: ", action.payload)
                state.userInfo = action.payload
            })
    }
})

export const selectUserInfo = (state: RootState) => {
    return state.user.userInfo
}

export const selectAccessToken = (state: RootState)=>{
    return state.user.userAccessToken
}

export const selectUserAlreadyRegistered = (state: RootState)=>{
    return state.user.userAlreadyRegistered
}


export const {setUserAccessToken, logoutUser, setUserAlreadyRegistered} = userSlice.actions

export default userSlice.reducer;