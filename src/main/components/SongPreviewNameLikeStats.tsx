import React from "react";
import SongViews from "./SongViews";
import LikeButton from "./LikeButton";
import "../css/components/SongPreview.scss"

interface SongPreviewNameLikeStatsPropsType {
    songName: string,
    numberOfViews: number
}

const SongPreviewNameLikeStats = (props: SongPreviewNameLikeStatsPropsType) => {
    return (
        <div className="name-like-stats-container">
            <span className="name">{props.songName}</span>
            <SongViews numberOfViews={props.numberOfViews} />
            <LikeButton />
        </div>
    )
}

export default SongPreviewNameLikeStats;