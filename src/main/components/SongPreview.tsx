import React from "react";
import {Grid} from "@mui/material";
import LikeButton from "./LikeButton";
import SongViews from "./SongViews";
import SongPreviewPostedUserLink from "./SongPreviewPostedUserLInk";
import SongPreviewNameLikeStats from "./SongPreviewNameLikeStats";
import {SongType} from '../reducer/songsReducer';

interface SongPreviewPropsType{
    song: SongType
}

const SongPreview = (props: SongPreviewPropsType)=>{
    return(
        <Grid item xs={2.4}>
            <div>
                <img className="image" src={props.song.imageUriLocation}/>
                <div className="song-preview-details"> 
                    <SongPreviewPostedUserLink userId={props.song.postedUser.userId} userName={props.song.postedUser.userName}/>
                    <SongPreviewNameLikeStats songName={props.song.songName} numberOfSongViews={props.song.numberOfLikes}/>
                </div>
                <hr></hr>
            </div>
        </Grid>
    )
}

export default SongPreview;