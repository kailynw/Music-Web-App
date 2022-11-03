import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { Nullable } from "../types/types";
import SongsActionTypes from "../constants/actions/songsActionTypes";
import SongEndpoints from "../constants/endpoints/songsEndpoints";

interface SongsStateType{
    songList: Nullable<Array<SongType>>
}

export interface SongType{
    songId: number,
    songName: string,
    description: Nullable<string>,
    imageUriLocation: string,
    songUriLocation: Nullable<string>,
    numberOfLikes: number,
    postedDate: string,
    postedUser: PostedUserType
}

export interface PostedUserType{
    userId: number,
    userName: string,
}

const initialState: SongsStateType= {
    songList: null
}

export const fetchSongList = createAsyncThunk(SongsActionTypes.FETCH_SONG_LIST, async ()=>{
    const response = await axios.get(SongEndpoints.GET_SONGS);
    console.log(response)
    return response.data;
})

const songsSlice = createSlice({
    name: SongsActionTypes.SONG_SLICE,
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchSongList.fulfilled, (state, action: PayloadAction<Array<SongType>>)=>{
                console.log("extra reducer payload: ", action.payload);                
                state.songList = action.payload;
            })
    }
})

export const selectSongList = (state: RootState)=>{
    console.log("Select:", state)
    return state.songs.songList;
}


export default songsSlice.reducer;