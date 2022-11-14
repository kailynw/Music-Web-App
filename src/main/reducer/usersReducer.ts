import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import UsersActionTypes from "../constants/actions/usersActionTypes";
import UsersEndpoints from "../constants/endpoints/usersEndpoints";
import { Nullable } from "../types/types"
import { SongType } from "./songsReducer";

interface UsersStateType{
    userList: Nullable<Array<UserType>>,
    currentlyViewedUser: Nullable<UserType>
}
export interface UserType {
    userId: number,
    userName: string,
    numberOfFollowing: number,
    numberOfFollowers: number,
    bio: Nullable<string>,
    instagramUrl: Nullable<string>,
    profilePictureUrl: Nullable<string>
    createdDate: string
    songList: Nullable<Array<SongType>>,
    test: string
}

const initialState: UsersStateType = {
    userList: null,
    currentlyViewedUser: null
}

export const fetchUserById = createAsyncThunk(UsersActionTypes.FETCH_USER_BY_ID, async (userId: any)=>{
    const getUserByIdEndpoint = `${UsersEndpoints.GET_USERS}/${userId}`
    const response = await axios.get(getUserByIdEndpoint)
    return response.data ;
})

const usersSlice = createSlice({
    name: UsersActionTypes.USERS_SLICE,
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<UserType>)=>{
                console.log("payload: ",action.payload)
                state.currentlyViewedUser = action.payload
            })        
    }
})

export const selectCurrentlyViewedUser = (state: RootState)=>{
    return state.users.currentlyViewedUser
}

export default usersSlice.reducer;