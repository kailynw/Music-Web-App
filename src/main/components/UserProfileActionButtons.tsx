import React, { useState, useEffect, ReactFragment } from 'react'
import { Button, SxProps, Theme, Box, Modal, Typography } from '@mui/material';
import {
    Add,
    HowToReg as AlreadyFollowedIcon,
    PersonAddAlt1 as AddFollowIcon,
    IosShare as ShareIcon,
    Edit as EditIcon,
    MoreHoriz as MoreIcon,
   
} from '@mui/icons-material';

import colors from '../css/InlineStyles/colors';
import { EditUserProfileModal } from './modal/EditUserProfileModal';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserAlreadyRegistered } from '../reducer/usersReducer';

const ButtonStyles: SxProps<Theme> = {
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    color: colors.PRIMARY_ICON_COLOR,
    fontSize: "10px",
    marginLeft: "5px",
    marginRight: "5px"
}


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 200,
    bgcolor: colors.PRIMARY_HEADER_BACKGROUND_COLOR,
    color: colors.PRIMARY_TEXT_COLOR,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

  };

const UserProfileActionButtons = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const displayModalAfterUserSignUp = searchParams.get("first_time_user") == "true"
    
    const dispatch = useDispatch();
    const [isUserFollowed, setIsUserFollowed] = useState(false);
    const [displayEditUserModal, setDislayEditUserModal] = useState(false);

    useEffect(()=>{
        if(displayModalAfterUserSignUp){
            dispatch(setUserAlreadyRegistered(true))
            setDislayEditUserModal(true)
        }
    },[displayModalAfterUserSignUp])
    const displayFollowUserStatus = () => {
        if (isUserFollowed) {
            return (
                <>
                    <AlreadyFollowedIcon />
                    <span>&nbsp; Following</span>
                </>
            )
        } else {
            return (
                <>
                    <AddFollowIcon />
                    <span>&nbsp; Follow</span>
                </>
            )
        }
    }

    const toggleFollowUserStatus = () => {
        if (isUserFollowed) {
            console.log("user not being followed")
            setIsUserFollowed(false)
        } else {
            console.log("user followed")
            setIsUserFollowed(true)
        }
    }

    return (
        <div>
            <Button onClick={toggleFollowUserStatus} sx={ButtonStyles}>
                {displayFollowUserStatus()}
            </Button>
            <Button sx={ButtonStyles}>
                <ShareIcon />
                <span>Share</span>
            </Button>
            <Button sx={ButtonStyles} onClick={()=> setDislayEditUserModal(true)}>
                <EditIcon />
                <span>Edit</span>
            </Button>
            <Button sx={ButtonStyles}>
                <MoreIcon />
            </Button>
            <EditUserProfileModal displayEditUserModal={displayEditUserModal} setDisplayEditUserModal={setDislayEditUserModal}/>
        </div>
    )
}

export default UserProfileActionButtons;