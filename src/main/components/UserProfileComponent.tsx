import React, {useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {useParams} from 'react-router-dom';
import {
    selectCurrentlyViewedUser,
    fetchUserById
} from '../reducer/usersReducer';
import { Container, Grid } from "@mui/material";

import "../css/components/UserProfileComponent.scss"

const UserProfileComponent = ()=>{
    const {userId} = useParams();
    const currentlyViewedUser = useAppSelector(selectCurrentlyViewedUser)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchUserById(userId))
    }, [])
    
    return(
        <Container id="user-profile-container">
            <Grid container>
                <Grid id="user-profile-header" xs={12}>
                    
                </Grid>
                <Grid xs={6}>
                    <div>{`User id: ${userId}`}</div>
                </Grid><Grid xs={6}>
                    <div>{`User id: ${userId}`}</div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserProfileComponent;