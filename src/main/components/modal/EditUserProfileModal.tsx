import React, { useState } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Container, Input, SxProps, TextField, Theme, Grid } from "@mui/material";
import '../../css/components/Profile.scss'
import colors from "../../css/InlineStyles/colors";
import { Style } from "node:util";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editUserProfile, EditUserProfilePayload, selectAccessToken , selectUserInfo} from "../../reducer/usersReducer";
import { Nullable } from "../../types/generalTypes";
import { ALERT_SUCCESS_STATUS, setAlertStatusAndMessage } from "../../reducer/alertReducer";

type EditUserProfileModalProps = {
    displayEditUserModal: boolean
    setDisplayEditUserModal: any
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
        
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    },
}));


const ModalTextField = styled(TextField)({
    '& .MuiInputBase-input':{
        color: 'white'
    },
    '& label.MuiFormLabel-root':{
        color: colors.PRIMARY_TEXT_COLOR
    },
    '& label.Mui-focused': {
      color: "#1976d2",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
});


export const EditUserProfileModal = (props: EditUserProfileModalProps)=>{
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector(selectAccessToken);
    const userInfo = useAppSelector(selectUserInfo);
    const [userName, setUserName] = useState(userInfo?.userName)
    const [bio, setBio] = useState(userInfo?.bio)
    const [instagramUrl, setInstagramUrl] = useState(userInfo?.instagramUrl)
    const [profilePictureUrl, setProfilePictureUrl] = useState(userInfo?.profilePictureUrl)
    
    console.log("Access Token:", {accessToken})
    console.log("user info:", {userInfo})

    const handleEditUserProfile = ()=>{
        console.log("test 123")
        const editUserProfilePayload: EditUserProfilePayload = {
            userName:userName,
            bio: bio,
            instagramUrl: instagramUrl,
            profilePictureUrl: profilePictureUrl
        }
        if(userInfo){
            dispatch(editUserProfile({userId: userInfo.userId, accessToken: accessToken, editUserProfilePayload: editUserProfilePayload})).then(()=>{
                props.setDisplayEditUserModal(false)
                dispatch(setAlertStatusAndMessage({
                    alertStatus: "success", alertMessage:"Successfully updated profile"}))
            })
        }

    }

    return(
        <>
            <BootstrapDialog
                onClose={()=>props.setDisplayEditUserModal(false)}
                aria-labelledby="customized-dialog-title"
                open={props.displayEditUserModal}
                fullWidth
            >
                <div id='edit-user-modal-container'>
                    <DialogTitle sx={{ m: 0, p: 2, color: colors.PRIMARY_TEXT_COLOR}} id="customized-dialog-title">
                    Modal title
                    </DialogTitle>
                    <IconButton
                    aria-label="close"
                    onClick={()=> props.setDisplayEditUserModal(false)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: colors.PRIMARY_ICON_COLOR
                    })}
                    >
                    <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                    <Container className="edit">
                        <Grid item lg={12} xs={12}>
                            <ModalTextField fullWidth defaultValue={userName} onBlur={(e:any)=>{setUserName(e.target.value)}} className="text-field" label="User Name" variant="filled" />
                        </Grid>
                        <Grid item xs={12}>
                            <ModalTextField fullWidth defaultValue={bio} onBlur={(e:any)=>{setBio(e.target.value)}} className="bio" label="Bio" variant="filled" />
                        </Grid>
                        <Grid item xs={12}>
                            <ModalTextField fullWidth defaultValue={instagramUrl} onBlur={(e:any)=>{setInstagramUrl(e.target.value)}} className="text-field" label="Instagram" variant="filled" />
                        </Grid>
                        <Grid item xs={12}>
                            <ModalTextField fullWidth defaultValue={profilePictureUrl} onBlur={(e:any)=>{setProfilePictureUrl(e.target.value)}} className="text-field" label="Profile Picture" variant="filled" />
                            <img src={userInfo?.profilePictureUrl}/>
                        </Grid>
                    </Container>

                    {/* <div className="textbox-container"> */}
                        
                        {/* <TextField className="text-field" label="Filled" variant="filled" />
                        <TextField className="text-field"  label="Filled" variant="filled" />
                        <TextField className="text-field"   label="Filled" variant="filled" /> */}
                    {/* </div> */}
                    {/* <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                        ullamcorper nulla non metus auctor fringilla.
                    </Typography> */}
                    </DialogContent>
                    <DialogActions>
                    <Button sx={{color: colors.PRIMARY_ICON_COLOR}} onClick={()=>handleEditUserProfile()} autoFocus>
                        Save changes
                    </Button>
                    </DialogActions>
                </div>
            </BootstrapDialog>        
        </>

    )
}