import React , {useState, useEffect} from "react"
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { styled, Theme, ThemeProvider, createTheme, SxProps } from "@mui/material/styles";
import {
    AppBar, Box,
    Toolbar, IconButton,
    Typography, Button,
    Tooltip, Avatar,
    MenuItem, Menu,
    Container, Grid,
    CssBaseline, Stack
} from "@mui/material"

import {
    Menu as MenuIcon,
    Settings as SettingsIcon,
    Upload as UploadIcon
} from '@mui/icons-material';

//Redux
import { 
    selectNavigationInformation,
    NavigationInformationType 
} from "../../reducer/navigationReducer";
import { 
    selectCurrentlyViewedUser,
    UserType
 } from "../../reducer/usersReducer";

 import { Nullable } from "../../types/generalTypes";

//CSS
import colors from '../../css/InlineStyles/colors'
import app_icon from '../../../assets/soundwave-app-icon.png'
import '../../css/components/navigation/HeaderNav.scss'

const HeaderStyles: SxProps<Theme> = {
    position: "relative",
    paddingLeft: "100px",
    boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.9), 0 2px 4px 0 rgba(0, 0, 0, 0.5)",
    backgroundColor: colors.PRIMARY_HEADER_BACKGROUND_COLOR,
    height: "15px"
}

const NavButtonStyles: SxProps<Theme> = {
    color: colors.PRIMARY_TEXT_COLOR,
    fontSize: "15px",
    paddingLeft: "20px",
    paddingRight: "20px",
    "&:hover": {
        color: colors.PRIMAY_HOVER_TEXT_COLOR
    }
}

const AppIconNavButtonStyles: SxProps<Theme> = {
    paddingRight: "3%",
}

const AvatarStyles: SxProps<Theme> = {
    width: "25px",
    height: "25px",
    right: "10px"
}

const IconStyles: SxProps<Theme> = {
    color: colors.PRIMARY_TEXT_COLOR,
    fontSize: "18px",

}

const LinkStyles: React.CSSProperties = {
    textDecoration: "none"
}

const HeaderNav = () => {
    const navigationInformation: NavigationInformationType = useAppSelector(selectNavigationInformation);
    const currentlyViewedUser: Nullable<UserType> = useAppSelector(selectCurrentlyViewedUser);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    console.log("CURRENTLY VIEWED USER: ", currentlyViewedUser)

    const userSettings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    useEffect(()=>{
        displayUserProfilePicture()
    }, [currentlyViewedUser])
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    // }

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // }

    const applyActiveLinkStyles = (isActive: boolean) => {
        const className = isActive ? "active" : ""
        console.log("class: ", className)
        return className
    }

    const displayUserProfilePicture = () => {
        // if(currentlyViewedUser && currentlyViewedUser.profilePictureUrl){
        //     console.log("yooooooooo")
        //     setProfilePictureUrl(currentlyViewedUser.profilePictureUrl)
        // }else{
        //     setProfilePictureUrl("")
        // }
    }

    return (
        <div>
            <React.Fragment>
                {/* <CssBaseline/> */}
                <Toolbar sx={HeaderStyles}>
                    <Container>
                        <Grid container>
                            <Grid item xs={12}>
                                {/* App Button Link */}
                                <Link style={LinkStyles} to="/">
                                    <Button sx={AppIconNavButtonStyles}>
                                        <img id="app_icon" src={app_icon} />
                                    </Button>
                                </Link>

                                {/* Home Button Link */}
                                <Link style={LinkStyles} to="/">
                                    <span >
                                        <Button sx={NavButtonStyles}>
                                            <span className={applyActiveLinkStyles(navigationInformation.homePage.isActive)} >Home</span>
                                        </Button>
                                    </span>
                                </Link>

                                {/* Library Button Link - fill in later */}
                                <Link style={LinkStyles} to="/library">
                                    <Button sx={NavButtonStyles}>Library</Button>
                                </Link>

                                {/* Upload Button Link  Fill in later*/}
                                <Link style={LinkStyles} to="/upload">
                                    <Button sx={NavButtonStyles}>
                                        <span >Upload</span>
                                        <UploadIcon sx={IconStyles} />
                                    </Button>
                                </Link>

                                {/* User Profile Button Link - Fill in later*/}
                                <Link style={{ ...LinkStyles, paddingLeft: "30%" }} to="#">
                                    <span>
                                        <Button sx={NavButtonStyles}>
                                            <Avatar sx={AvatarStyles} alt="Place user name here" src={profilePictureUrl} />
                                            <span className={applyActiveLinkStyles(navigationInformation.userProfilePage.isActive)}> Profile Name </span>
                                        </Button>
                                    </span>
                                </Link>

                                <Button>
                                    <SettingsIcon sx={IconStyles} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>

                </Toolbar>
            </React.Fragment>
        </div>

    )
}

export default HeaderNav