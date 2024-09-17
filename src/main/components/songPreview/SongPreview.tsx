import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import SongPreviewPostedUserLink from "./SongPreviewPostedUserLInk"
import SongPreviewNameLikeStats from "./SongPreviewNameLikeStats"
import { useAppDispatch, useAppSelector } from "../../app/hooks";


//Redux
import { SongPropsType } from "../../types/propsTypes"
 

//CSS
import "../../css/components/SongPreview.scss"


const SongPreview = (props: SongPropsType) => {


    return (
        <div>
            <img className="image" src={props.song.imageUriLocation} />
            <div className="song-preview-details-container">
                <SongPreviewPostedUserLink userId={props.song.postedUser.userId} userName={props.song.postedUser.userName} />
                <SongPreviewNameLikeStats songName={props.song.songName} numberOfViews={props.song.numberOfViews} />
            </div>
            <hr></hr>
        </div>
    )
}

export default SongPreview;