import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useParams } from 'react-router-dom';
import {
    Container, Grid,
    Avatar, SxProps,
    Theme
} from "@mui/material";
import UserProfileInformationContainer from "./UserProfileInformationContainer";

//Redux
import {
    selectCurrentlyViewedUser,
    getUserById, UserType
} from '../reducer/usersReducer';
import { Nullable } from "../types/generalTypes"

import colors from "../css/InlineStyles/colors";
import SongPreviewMusicPlayer from "./songPreview/SongPreviewMusicPlayer";

const ContainerStyles: SxProps<Theme> = {
    position: "relative",
    top: "30px",
    color: colors.PRIMARY_TEXT_COLOR
}

const AvatarStyles: React.CSSProperties = {
    width: "200px",
    height: "200px",
    left: "5%",
    top: "45%"

}
const UserProfileComponent = () => {
    const { userId } = useParams();
    const currentlyViewedUser: Nullable<UserType> = useAppSelector(selectCurrentlyViewedUser)
    const dispatch = useAppDispatch();

    console.log("current: ", currentlyViewedUser && currentlyViewedUser.instagramUrl)
    useEffect(() => {
        dispatch(getUserById(userId))
        updateHeadlineBackgroundImage()  
    }, [])

    const updateHeadlineBackgroundImage = () => {
        if (currentlyViewedUser && currentlyViewedUser.profilePictureUrl) {
            const profilePicture = currentlyViewedUser.profilePictureUrl
            console.log("CAN YOU SEE: ",profilePicture)
            const UpdatedHeadlineContainerStyles: React.CSSProperties = {
                backgroundImage: `url(${profilePicture})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                width: "100%",
                height: "200px",
            }
            return UpdatedHeadlineContainerStyles
        } else {
            const HeadlineContainerStyles: React.CSSProperties = {
                backgroundColor: "grey",
                width: "100%",
                height: "200px"
            }
            return HeadlineContainerStyles
        }
    }

    return (
        <Container sx={ContainerStyles} >
            <Grid container>
                <Grid item xs={12}>
                    <div style={updateHeadlineBackgroundImage()}>
                        <Avatar sx={AvatarStyles} alt="Place user name here" src="https://source.unsplash.com/random/400x400" />
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <UserProfileInformationContainer />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserProfileComponent;