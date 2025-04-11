import React , {useState, useEffect, useRef} from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useNavigate} from "react-router-dom";
import { styled, Theme, ThemeProvider, createTheme, SxProps } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import {
    AppBar, Box,
    Toolbar, IconButton,
    Typography, Button,
    Tooltip, Avatar,
    MenuItem, Menu,
    Container, Grid,
    CssBaseline, Stack,
    Alert
} from "@mui/material"

import {
    Menu as MenuIcon,
    Settings as SettingsIcon,
    Upload as UploadIcon,
} from '@mui/icons-material';

//Redux
import { 
    selectNavigationInformation,
    NavigationInformationType 
} from "../../reducer/navigationReducer";
import { 
    loginUser,
    logoutUser,
    selectAccessToken,
    selectUserAlreadyRegistered,
    selectUserInfo,
    setUserAccessToken,
    setUserAlreadyRegistered,
    UserType
 } from "../../reducer/usersReducer";

 import { Nullable } from "../../types/generalTypes";

//CSS
import colors from '../../css/InlineStyles/colors'
import app_icon from '../../../assets/soundwave-app-icon.png'
import '../../css/components/navigation/HeaderNav.scss'
import { useDispatch } from "react-redux";
import { AlertStateType, selectAlertInfo } from "../../reducer/alertReducer";
import {store} from '../../app/store'
import { access } from "fs";

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
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
        getAccessTokenSilently
      } = useAuth0();
    const dispatch = useAppDispatch()
    const navigationInformation: NavigationInformationType = useAppSelector(selectNavigationInformation);
    const userInfo: Nullable<UserType> = useAppSelector(selectUserInfo);
    const alertInfo: AlertStateType = useAppSelector(selectAlertInfo)
    const displayAlert = alertInfo.alertMessage && alertInfo.alertStatus
    const accessToken = useAppSelector(selectAccessToken)
    const userAlreadyRegistered = useAppSelector(selectUserAlreadyRegistered)

    const navigate = useNavigate()

    const userSettings = ['Profile', 'Account', 'Dashboard', 'Logout']


    useEffect(()=>{
        if(isAuthenticated && !accessToken){
            console.log("isAuth: ", isAuthenticated)
            console.log("access token: ", accessToken)
    
            console.log("AUTHENTICATED USE EFFECT TRIGGERED for lOgin!")
            console.log("getting logged right before silent token")
            getAccessTokenSilently().then((value: string)=>{
                console.log("Get token value silent: ," ,value)
                console.log("inside Get token Silently: ", value)
                dispatch(setUserAccessToken(value))
                dispatch(loginUser({accessToken: value, userData: user}))
            })
        }
    }, [isAuthenticated])

    useEffect(()=>{
        console.log("Redirected to profile already?: ", userAlreadyRegistered)
        const firstTimeUserRegistration = userInfo && userInfo.numberOfLogins == 1 && !userAlreadyRegistered
        if(firstTimeUserRegistration){
            //Redirect to /profile page
            navigate(`/user/${userInfo.userId}?first_time_user=true`)
        }
    },[userInfo])

    const applyActiveLinkStyles = (isActive: boolean) => {
        const className = isActive ? "active" : ""
        console.log("class: ", className)
        return className
    }

    const handleLogout = ()=>{
        dispatch(logoutUser())//Clear user state
        logout() //Auth0 logout and redirect
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
                                <Link style={LinkStyles} to="/songs">
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
                                {accessToken && userInfo &&
                                    <Link  style={{ ...LinkStyles, paddingLeft: "30%" }} to={`/user/${userInfo.userId}`}>
                                        <span>
                                            <Button sx={NavButtonStyles}>
                                                <Avatar sx={AvatarStyles} alt="Place user name here" src={userInfo.profilePictureUrl} />
                                                <span id="username-link-text" className={applyActiveLinkStyles(navigationInformation.userProfilePage.isActive)}>
                                                    {userInfo.userName}
                                                </span>
                                            </Button>
                                        </span>
                                    </Link>
                                }   

                                {accessToken ? (
                                    <Button sx={NavButtonStyles} onClick={()=>handleLogout()}>Logout</Button>
                                ):(
                                    <Button sx={{ ...NavButtonStyles, paddingLeft: "30%" }} onClick={()=>loginWithRedirect()}>Login/Sign Up</Button>
                                )}


                                {accessToken &&
                                    <Button>
                                        <SettingsIcon sx={IconStyles} />
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>

                {/* /*Global alert */}
                {(alertInfo.alertStatus && alertInfo.alertMessage) &&
                    <Alert className="global-alert-banner"variant="filled" severity={alertInfo.alertStatus}>
                        {alertInfo.alertMessage}
                    </Alert>
                }
            </React.Fragment>
        </div>

    )
}

export default HeaderNav