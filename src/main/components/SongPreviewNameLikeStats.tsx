import React from "react";
import SongViews from "./SongViews";
import LikeButton from "./LikeButton";
import "../css/components/SongPreviewNameLikeStats.scss"

interface SongPreviewNameLikeStatsPropsType{
    songName: string,
    numberOfSongViews: number
}

const SongPreviewNameLikeStats = (props: SongPreviewNameLikeStatsPropsType)=>{
    return(
        <div className="song-preview-name-like-stats">
            <span className="name">{props.songName}</span>
            <SongViews numberOfSongViews={props.numberOfSongViews}/> 
            <LikeButton/> 
        </div>
    )
}

export default SongPreviewNameLikeStats;