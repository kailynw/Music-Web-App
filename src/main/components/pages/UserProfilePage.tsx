import React, { useEffect } from "react";
import HeaderNav from "../navigation/HeaderNav";
import SongPreviewList from '../SongPreviewList';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import UserProfileComponent from '../UserProfileComponent';

//Redux
import {
    selectNavigationInformation,
    setActivePage, NavigationInformationType
} from "../../reducer/navigationReducer";

const UserProfilePage = () => {
    const navigationInformation = useAppSelector(selectNavigationInformation)
    const dispatch = useAppDispatch();
    const updatedNavigationInformation: NavigationInformationType = {
        homePage: {
            isActive: false
        },
        userProfilePage: {
            isActive: true
        }
    }

    useEffect(() => {
        dispatch(setActivePage(updatedNavigationInformation))
    }, []);

    return (
        <div>
            <HeaderNav />
            <UserProfileComponent />
        </div>
    )

}

export default UserProfilePage;
