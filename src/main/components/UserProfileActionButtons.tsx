import React, {useState, useEffect, ReactFragment} from 'react'
import { Button, SxProps, Theme } from '@mui/material';
import {
    Add,
    HowToReg as AlreadyFollowedIcon, 
    PersonAddAlt1 as AddFollowIcon,
    IosShare as ShareIcon,
    Edit as EditIcon,
    MoreHoriz as MoreIcon
} from '@mui/icons-material';

import colors from '../css/InlineStyles/colors';

const ButtonStyles: SxProps<Theme> = {
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    color: colors.PRIMARY_ICON_COLOR,
    fontSize: "10px",
    marginLeft: "5px",
    marginRight: "5px"
}

const UserProfileActionButtons = ()=>{
    const [isUserFollowed, setIsUserFollowed] = useState(false);

    const displayFollowUserStatus = ()=>{
        if(isUserFollowed){
            return(
                <>
                    <AlreadyFollowedIcon/>
                    <span>&nbsp; Following</span>
                </>
            )
        }else{
            return(
                <>
                    <AddFollowIcon/>
                    <span>&nbsp; Follow</span>
                </>
            )
        }     
    }

    const toggleFollowUserStatus = ()=>{
        if(isUserFollowed){
            console.log("user not being followed")
            setIsUserFollowed(false)
        }else{
            console.log("user followed")
            setIsUserFollowed(true)
        }
    }

    return(
        <div>
            <Button onClick={toggleFollowUserStatus} sx={ButtonStyles}>
                {displayFollowUserStatus()}
            </Button>
            <Button sx={ButtonStyles}>
                <ShareIcon/>
                <span>Share</span>
            </Button>
            <Button sx={ButtonStyles}>
                <EditIcon/>
                <span>Edit</span>
            </Button>
            <Button sx={ButtonStyles}>
                <MoreIcon/>
            </Button>
        </div>
    )
}

export default UserProfileActionButtons;