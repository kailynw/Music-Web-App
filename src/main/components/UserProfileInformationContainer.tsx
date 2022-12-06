import React, { useState, useEffect } from "react"
import {
    Container, Grid, SxProps, Theme
} from "@mui/material";

import UserProfileSongPreviewTabs from "./UserProfileSongPreviewTabs";
import UserProfileActionButtons from "./UserProfileActionButtons";
import colors from "../css/InlineStyles/colors";

const ContainerStyles: SxProps<Theme> = {
    backgroundColor: colors.PRIMARY_HEADER_BACKGROUND_COLOR
}

const GridContainerStyles: SxProps<Theme> = {
    position: "relative",
    paddingTop: "100px"
}

const UserProfileInformationContainer = () => {
    return (
        <Container sx={ContainerStyles}>
            <Grid sx={GridContainerStyles} container>
                <Grid item xs={7}>
                    <UserProfileSongPreviewTabs />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <UserProfileActionButtons />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserProfileInformationContainer;