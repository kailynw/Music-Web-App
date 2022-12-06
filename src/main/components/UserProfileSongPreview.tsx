import React from "react";
import { Grid } from "@mui/material";
import UserProfileSongPreviewDetailsContainer from "./UserProfileSongPreviewDetailsContainer";
import { SongPropsType } from "../types/propsTypes";


//CSS
import "../css/components/SongPreview.scss"

const UserProfileSongPreview = (props: SongPropsType) => {
    return (
        <div className = "user-profile">
            <Grid container>
                <Grid item xs={3}>
                    <img className="image" src={props.song.imageUriLocation} />
                </Grid>

                <Grid item xs={9}>
                    <UserProfileSongPreviewDetailsContainer song={props.song}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserProfileSongPreview;