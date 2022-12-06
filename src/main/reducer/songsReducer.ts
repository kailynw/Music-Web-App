import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { Nullable } from "../types/generalTypes";
import SongsActionTypes from "../constants/actions/songsActionTypes";
import SongEndpoints from "../constants/endpoints/songsEndpoints";

interface SongsStateType {
    songsList: Nullable<Array<SongType>>
}

export interface SongType {
    songId: number,
    songName: string,
    description: Nullable<string>,
    imageUriLocation: string,
    songUriLocation: Nullable<string>,
    numberOfLikes: number,
    numberOfViews: number,
    postedDate: string,
    postedUser: PostedUserType
}

export interface PostedUserType {
    userId: number,
    userName: string,
}

const initialState: SongsStateType = {
    songsList: null
}

export const getAllSongsList = createAsyncThunk(SongsActionTypes.GET_ALL_SONGS, async () => {
    const response = await axios.get(SongEndpoints.GET_ALL_SONGS);
    console.log(response)
    return response.data;
})

export const getSongsListByUserId = createAsyncThunk(SongsActionTypes.GET_SONGS_BY_USER_ID, async (userId:  string | undefined) => {
    const response = await axios.get(SongEndpoints.GET_SONGS_BY_USER_ID(userId));
    console.log("get song list by user id response: ",response)
    return response.data;
})

const songsSlice = createSlice({
    name: SongsActionTypes.SONG_SLICE,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSongsList.fulfilled, (state, action: PayloadAction<Array<SongType>>) => {
                console.log("extra reducer payload getAllSongsList: ", action.payload);
                state.songsList = action.payload;
            })
            .addCase(getSongsListByUserId.fulfilled, (state, action: PayloadAction<Array<SongType>>) =>{
                console.log("extra reducer payload getSongsListByUserId: ", action.payload);
                state.songsList = action.payload;
            })
    }
})

export const selectSongsList = (state: RootState) => {
    console.log("Select:", state)
    return state.songs.songsList;
}


export default songsSlice.reducer;