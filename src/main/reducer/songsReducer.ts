import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { Nullable } from "../types/generalTypes";
import SongsActionTypes from "../constants/actions/songsActionTypes";
import SongEndpoints from "../constants/endpoints/songsEndpoints";

interface SongsStateType {
    songsList: Nullable<Array<SongType>>,
    activeSong: Nullable<SongType>
}

export interface SongType {
    songId: number,
    songName: string,
    description: Nullable<string>,
    imageUriLocation: string,
    songUriLocation: string,
    numberOfLikes: number,
    numberOfViews: number,
    postedDate: string,
    postedUser: PostedUserType,
    songPresignedUrl: Nullable<string>
}

export interface PostedUserType {
    userId: number,
    userName: string,
}

const initialState: SongsStateType = {
    songsList: null,
    activeSong: null
}

export const getAllSongsList = createAsyncThunk(SongsActionTypes.GET_ALL_SONGS, async () => {
    const response = await axios.get(SongEndpoints.GET_ALL_SONGS);
    console.warn(`CAN YOU SEE THIS!!!!  ${JSON.stringify(response)}`)
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
    reducers: {
        setActiveSong: (state, action: PayloadAction<SongType>) =>{
            console.log("reducer setActiveSong payload: ", action.payload)
            state.activeSong = action.payload
        }
    },
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

export const { setActiveSong } = songsSlice.actions

export const selectSongsList = (state: RootState) => {
    // console.log("Select:", state)
    return state.songs.songsList;
}

export const selectActiveSong = (state: RootState) => {
    // console.log("Seclected active song: ", state.songs.activeSong)
    return state.songs.activeSong
}


export default songsSlice.reducer;