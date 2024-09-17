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
    console.info(`SOUND AUDIO PROPS!!!${JSON.stringify(props)}`)
    console.log(props)
    const audio = new Audio("https://music-app-upload-bucket.s3.amazonaws.com/test_track.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240917T014549Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=AKIA4DABEEPAVYWO776A%2F20240917%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5f61584ff07b2750a286f0901cb0d8a5bb5d84bca6f7973318ebfeb43d74de11")
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
                console.log(`Ready state is ${audio.readyState}`)
                setSongIsReadyState(audio.readyState == 4)
                
                if(audio.readyState != 4) {
                console.log("song state is not ready")

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


