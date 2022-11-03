import React, {useEffect} from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {useParams} from 'react-router-dom';
import {
    selectCurrentlyViewedUser,
    fetchUserById
} from '../reducer/usersReducer';

const UserProfileComponent = ()=>{
    const {userId} = useParams();
    const currentlyViewedUser = useAppSelector(selectCurrentlyViewedUser)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchUserById(userId))
    }, [])
    
    return(
        <div>
            <div>{`User id: ${userId}`}</div>
            <div>{`User profile info: ${JSON.stringify(currentlyViewedUser)}`}</div>
        </div>
    )
}

export default UserProfileComponent;