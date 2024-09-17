import React, { useState, useEffect } from 'react'
import { SongType } from '../reducer/songsReducer'
import { Nullable } from '../types/generalTypes'
import { Container, Grid } from '@mui/material'
import SongPreview from './songPreview/SongPreview'
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
        <div>
            <Grid container>
                {songsList && songsList.map(song=>(
                    <Grid key={song.songId} item xs={12}>
                        <UserProfileSongPreview song={song}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default UserProfileSongPreviewList;