import React, { useEffect } from "react";
import { styled, Theme, ThemeProvider, createTheme, SxProps } from "@mui/material/styles";
import {
    Container,
    Box, Grid,
    CssBaseline,
    Paper
} from "@mui/material";
import SongPreview from "./SongPreview";

//Redux
import {
    selectSongsList,
    getAllSongsList
} from "../../reducer/songsReducer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";



const SongGridStylesWrapper = styled(Paper)((({ theme }) => ({

})));

const ContainerStyles: SxProps<Theme> = {
    position: "relative",
    paddingTop: "3%",
    paddingBottom: "3%"
}

const SongPreviewList = () => {

    const songsList = useAppSelector(selectSongsList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllSongsList());
    }, []);

    return (

        <div>
            <React.Fragment>
                {/* <CssBaseline/>  */}
                <Container sx={ContainerStyles} maxWidth="xl" >
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={5}>
                            {songsList && songsList.map(song => (
                                <Grid item xs={2.4}>
                                    <SongPreview key={song.songId} song={song} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </React.Fragment>
        </div>
    )
}

export default SongPreviewList;