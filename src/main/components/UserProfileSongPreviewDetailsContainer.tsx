import React, {useState} from 'react';
import {  
    Grid, Button,
    SxProps, Theme
} from "@mui/material";
import {
    PlayCircleFilledWhiteOutlined as PlayButton,
    StopCircleOutlined as StopButton
} from '@mui/icons-material';
import SongViews from "./SongViews";
import LikeButton from "./LikeButton";
import SongPreviewPostedUserLink from './SongPreviewPostedUserLInk';
import SongPreviewMusicPlayer from './SongPreviewMusicPlayer';
import { SongPropsType } from "../types/propsTypes";

//CSS
import "../css/components/SongPreview.scss"
import colors from "../css/InlineStyles/colors"

const primaryColorButtonStyles: SxProps<Theme> = {
    color: colors.PRIMARY_ICON_COLOR,
    fontSize: "40px",
    marginLeft: "5px",
    marginRight: "5px"
}

const secondaryColorButtonStyles: SxProps<Theme> = {
    color: colors.PRIMARY_HOVER_HEADER_BOTTOM_BORDER_COLOR,
    fontSize: "40px",
    marginLeft: "5px",
    marginRight: "5px",
    
}

const UserProfileSongPreviewDetailsContainer = (props: SongPropsType)=>{
    const [displayPlayButton, setDisplayPlayButton] = useState(true);
    
    const toggleLikeButtonColor = () => {
        const displayPlay: boolean = displayPlayButton == true? false :true;
        setDisplayPlayButton(displayPlay)
    }

    return(
        <Grid container>
            <Grid item xs={1}>
                {displayPlayButton 
                    ? <PlayButton sx={primaryColorButtonStyles} onClick={toggleLikeButtonColor}/>
                    : <StopButton sx={secondaryColorButtonStyles} onClick={toggleLikeButtonColor}/>
                }
            </Grid>
            <Grid item xs={10}>
                <div className="song-preview-details-container">
                    <SongPreviewPostedUserLink userId={props.song.postedUser.userId} userName={props.song.postedUser.userName} />
                    <div className="name">{props.song.songName}</div>
                    {/* <SongPreviewMusicPlayer/> */}
                    <SongViews numberOfViews={props.song.numberOfViews} />
                    <LikeButton />
                </div>
            </Grid>  
        </Grid>
    )
}

export default UserProfileSongPreviewDetailsContainer;