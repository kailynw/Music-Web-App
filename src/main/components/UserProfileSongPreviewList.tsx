import React, { useState, useEffect } from 'react'
import { SongType } from '../reducer/songsReducer'
import { Nullable } from '../types/generalTypes'
import { Container, Grid } from '@mui/material'
import SongPreview from './SongPreview'
import UserProfileSongPreview from './UserProfileSongPreview'

interface SongsListPropsType {
    songsList: Nullable<Array<SongType>>
}

const UserProfileSongPreviewList = (props: SongsListPropsType) => {
    const songsList = props.songsList
    const [value, setValue] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setValue(newValue);
    };

    return (
        <Grid container>
            {songsList && songsList.map(song=>(
                <Grid item xs={12}>
                    <UserProfileSongPreview key={song.songId} song={song}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default UserProfileSongPreviewList;