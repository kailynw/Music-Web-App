import { 
    SxProps,Theme,
    LinearProgress,Grid,
 } from "@mui/material";
 import {
     Bolt,
    PlayCircleFilledWhiteOutlined as PlayButton,
    StopCircleOutlined as StopButton
} from '@mui/icons-material';
import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

//CSS
import colors from "../../css/InlineStyles/colors";
import '../../css/components/SongPreview.scss'
import { SongType, setActiveSong, selectActiveSong } from "../../reducer/songsReducer";
import SongPreviewPostedUserLink from "./SongPreviewPostedUserLInk";
import { setDefaultResultOrder } from "dns";
import { act } from "react-dom/test-utils";

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

const progressBarStyles: SxProps<Theme> = {
    position: "relative",
    marginLeft: "10px"
}

interface MusicPlayerProps{
    songAudio: HTMLAudioElement,
    songIsReadyState: boolean,
    song: SongType
}



const SongPreviewMusicPlayer = (props: MusicPlayerProps)=>{
    const [displayPlayButton, setDisplayPlayButton]= useState(true);
    const [playButtonClickCounter, setPlayButtonClickCounter] = useState(0);
    const [currentPlayTime, setCurrentPlayTime] = useState(0);
    const [playSongPromise, setPlaySongPromise]: [any, any]  = useState(undefined)
    const [progressBarSpeed, setProgressBarSpeed] = useState(1)
    const dispatch = useAppDispatch();
    const activeSong = useAppSelector(selectActiveSong)

    useEffect(()=>{
            // const getProgressBarSpeed = ()=>{
        if(props.songIsReadyState && activeSong?.songId == props.song.songId){
            const progressBarCssSelector = `#song-music-player-container-${props.song.songId} .progress-bar`
            const progressBar= document.querySelector(progressBarCssSelector) //Get element based on mulitple tags
            // console.log("prog bar: ", progressBar)
            const progressBarWidth = 100
            console.log("prog bar width: ", progressBarWidth)
            if(progressBarWidth){
                const speed = progressBarWidth / props.songAudio.duration
                console.log("speeddd: ", speed)
                setProgressBarSpeed(speed)
            }
            // setProgressBarSpeed()
        }
    // }
    // getProgressBarSpeed()

    }, [props.songIsReadyState, activeSong])

    useEffect(()=>{
    //    console.log(`playtime: ${currentPlayTime} | current px:  ${currentPlayTime * progressBarSpeed} `)
    },[currentPlayTime])

    const resetSong = ()=>{
        if(activeSong?.songId != props.song.songId && playSongPromise!=undefined){
            // console.log("play promise: ", playSongPromise)
            playSongPromise.then(()=> {
                //Pause and reset the sound
                props.songAudio.pause()
                props.songAudio.currentTime = 0 
                setCurrentPlayTime(0)
                setDisplayPlayButton(true)
                setPlaySongPromise(undefined)  
            });
           
        }
    }

    const formatSongTime = (seconds: number)=>{
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor((seconds % 60));
        
        // Pad minutes and seconds with leading zero if needed
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        
        return `${formattedMinutes}:${formattedSeconds}`;
    }
       
    /* On toggle play
        - Save active song state
        - Have condition to reset other songs if not active
    */

    const toggleDisplayPlayButton = () => {
        if(playButtonClickCounter==0){
            console.log("first time retrieving song")
        }

        console.log("current value for display play button"+ displayPlayButton) 
        // const updatedDisplayPlayButtonValue: boolean = displayPlayButton == true ? false : true;
        // console.log("current value for display play button updated value before set"+ displayPlayButton)

        // togglePlaySong(updatedDisplayPlayButtonValue)
        const displayValue =!displayPlayButton
        setDisplayPlayButton(displayValue)
        setPlayButtonClickCounter(playButtonClickCounter+1)       
    }

    /**
     * Song is able to be played when
     * - the browser loaded the song
     * - display button state is changed to false (stop button)
     *  
     * @param displayPlayValue - current symbol for play/stop button
     */
    const togglePlaySong = ()=> {
        console.log("in useeffect ready state: "+ props.songAudio.readyState)
        const playSong = !displayPlayButton && props.songAudio.readyState>0
        // const isActiveSong = activeSong == null || activeSong.songId == props.song.songId
        if(playSong){
            // console.log(`current Song time | ${props.songAudio.currentTime} `)
            // console.log("Playing song: ", props.song)
            const playSongPromise: Promise<void> = props.songAudio.play()
            setPlaySongPromise(playSongPromise)
            dispatch(setActiveSong(props.song))
        }else{
            props.songAudio.pause()
        }
    }

    /* Play song only when song is ready and when play button is pressed */
    useEffect(()=>{
        togglePlaySong()
    }, [props.songAudio.readyState, displayPlayButton])

    /* Reset song controller */
    useEffect(()=>{
        console.log("in reset song useeffect: ", playSongPromise)
        resetSong()
    }, [activeSong])
    

    /* Update current song duration progress bar */
    setInterval(()=>{
        if(displayPlayButton){
            setCurrentPlayTime(props.songAudio.currentTime)
        }
    }, 500)

    // const memoContent = useMemo(() => {
    //     if(props.songIsReadyState) {
    //         return(<div>
            
    //             <Grid container>
    //                 <Grid item xs={1}>
    //                     {displayPlayButton 
    //                         ? <PlayButton sx={primaryColorButtonStyles} onClick={toggleDisplayPlayButton}/>
    //                         : <StopButton sx={secondaryColorButtonStyles} onClick={toggleDisplayPlayButton}/>
    //                     }
    //                 </Grid>
    //                 <Grid>

    //                 </Grid>
    //                 <Grid item xs={11}>
    //                     <div className="song-preview-details-container">
    //                         <SongPreviewPostedUserLink userId={props.song.postedUser.userId} userName={props.song.postedUser.userName} />
    //                         <div className="name">{props.song.songName}</div>
    //                     </div>
    //                 </Grid>
    //             </Grid>

    //             <Grid container>
    //                 <Grid item xs={12}>
    //                     <LinearProgress variant="determinate" value={props.songAudio.currentTime} valueBuffer={props.songAudio.duration} />
    //                 </Grid>
    //             </Grid>
        
        

    //         {/* <Grid container>
    //             <Grid item xs={12}>
    //                 <SongViews numberOfViews={props.song.numberOfViews} />
    //                 <LikeButton />
    //             </Grid>
    //         </Grid> */}
    //         {/* <LinearProgress variant="determinate" value={props.songAudio.currentTime} valueBuffer={} /> */}
    //         {/* <div className="audio-player-container">hello</div> */}
    //     </div>)
    //     }
    //     return (<div>loading...</div>)
    // }, [props.songIsReadyState])

    // return <React.Fragment>
    //     {memoContent}
    // </React.Fragment>

    if(props.songIsReadyState) {
        return(<div id={`song-music-player-container-${props.song.songId}`}>
        
            <Grid container>
                <Grid item xs={1}>
                    {displayPlayButton 
                        ? <PlayButton sx={primaryColorButtonStyles} onClick={toggleDisplayPlayButton}/>
                        : <StopButton sx={secondaryColorButtonStyles} onClick={toggleDisplayPlayButton}/>
                    }
                </Grid>
                <Grid>

                </Grid>
                <Grid item xs={11}>
                    <div className="song-preview-details-container">
                        <SongPreviewPostedUserLink userId={props.song.postedUser.userId} userName={props.song.postedUser.userName} />
                        <div className="name">{props.song.songName}</div>
                    </div>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12}>
                    <LinearProgress className="progress-bar" sx={progressBarStyles} variant="determinate" value={props.songAudio.currentTime * progressBarSpeed} valueBuffer={props.songAudio.duration} />
                </Grid>
            </Grid>
            {/* <div>
                <span className='current-play-time-song-duration'> Time 1</span>
                <span className='end-time-song-duration'> Time 1</span>
            </div> */}
            <div className="song-time-container">
                <div className="current-play-time-song-duration">{formatSongTime(currentPlayTime)}</div>
                <div className="end-time-song-duration">{formatSongTime(props.songAudio.duration)}</div>
            </div>

        
        

            {/* <Grid container>
                <Grid item xs={12}>
                    <SongViews numberOfViews={props.song.numberOfViews} />
                <LikeButton />
            </Grid>
        </Grid> */}
        {/* <LinearProgress variant="determinate" value={props.songAudio.currentTime} valueBuffer={} /> */}
        {/* <div className="audio-player-container">hello</div> */}
    </div>)
    }
    return (<div>loading...</div>)

        
        
}

export default SongPreviewMusicPlayer;