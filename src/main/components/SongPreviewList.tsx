import React, {useEffect} from "react";
import {styled, Theme, ThemeProvider, createTheme, SxProps} from "@mui/material/styles";
import { 
    Container,
    Box, Grid, 
    CssBaseline, 
    Paper
} from "@mui/material";
import SongPreview from "./SongPreview";

//Redux
import { 
    selectSongList,
    fetchSongList
} from "../reducer/songsReducer";
import { useAppSelector, useAppDispatch } from "../app/hooks";

//CSS
import "../css/SongPreviewList.scss"

const SongGridStylesWrapper = styled(Paper)((({theme})=>({
    
})));

const ContainerStyles: SxProps<Theme> = {
    position: "relative",
    paddingTop:"3%",
    paddingBottom: "3%"
}

const SongPreviewList = ()=>{
    
    const songList = useAppSelector(selectSongList);
    const dispatch = useAppDispatch();
    
    useEffect(()=>{
        dispatch(fetchSongList());
    }, []);

    return(
        
        <div>
            <React.Fragment>
                <CssBaseline/>
                <Container  sx={ContainerStyles} maxWidth="xl" >
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={5}>
                            {songList && songList.map(song=>(
                               <SongPreview key={song.songId} song={song}/>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </React.Fragment>
        </div>
    )
}

export default SongPreviewList;