import React, {useState, useEffect, useCallback} from 'react';

import {  
    Grid, Button,
    SxProps, Theme,
    LinearProgress
} from "@mui/material";
import {
    PlayCircleFilledWhiteOutlined as PlayButton,
    StopCircleOutlined as StopButton
} from '@mui/icons-material';
import SongViews from "./SongViews";
import LikeButton from "./LikeButton";
import SongPreviewPostedUserLink from './songPreview/SongPreviewPostedUserLInk';
import SongPreviewMusicPlayer from './songPreview/SongPreviewMusicPlayer';
import { SongPropsType } from "../types/propsTypes";
import { SongAudio } from "../types/SongAudio";

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

let timeoutId;
const UserProfileSongPreviewDetailsContainer = (props: SongPropsType)=>{
    // console.info(`SOUND AUDIO PROPS!!!${JSON.stringify(props)}`)
    console.log(props.song.songPresignedUrl)
    const songPresignedUrl = props.song.songPresignedUrl ? props.song.songPresignedUrl : undefined
    const audio = new Audio(songPresignedUrl)
    const[songAudio, setSongAudio] = useState(audio);
    const[songIsReadyState, setSongIsReadyState] = useState(false)
    const [isSongLoaded, setIsSongLoaded] = useState(false)
    const [songLoaderInterval, setSongLoaderInterval] = useState(new Object())

    useEffect(()=>{
        let mounted = true;
        timeoutId = timeoutCallback(mounted);

        return () => {
            mounted = false
        }
    },[])

    const timeoutCallback = useCallback((mounted:boolean) => {
        return setTimeout(() => {
            if (mounted) {
                setSongIsReadyState(audio.readyState == 4)
                if(audio.readyState != 4) {
                timeoutCallback(mounted)
            }
            }
            
            
        }, 500)
    }, [audio])

    // useEffect(()=>{
    //     console.warn(`Song Ready state: ${songAudio.readyState}`)
    //     // setIsSongLoaded(songAudio.readyState>0)
    //    const interval: NodeJS.Timer =  setInterval(()=>{
    //         if(songAudio.readyState>3){
    //             console.log("song loaded sucessfully" + songAudio.readyState)
    //             setIsSongLoaded(true)
    //         }
    //    }, 5000)
    //    console.log(interval)
    //    setSongLoaderInterval(interval)
    // })

    // useEffect(()=>{
    //     console.warn(`Song Ready state: ${songAudio.readyState}`)
    //     // setIsSongLoaded(songAudio.readyState>0)
    //    console.log("song interval loader state: "+ songLoaderInterval)
        
    // }, [songLoaderInterval])

    return(
        <div>
            <SongPreviewMusicPlayer songAudio={songAudio} song={props.song} songIsReadyState={songIsReadyState}/>
        </div>
    )
}

export default UserProfileSongPreviewDetailsContainer;


