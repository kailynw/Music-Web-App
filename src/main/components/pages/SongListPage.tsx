import React, {useEffect} from "react";
import HeaderNav from "../navigation/HeaderNav";
import SongPreviewList from '../SongPreviewList';
import { useAppDispatch, useAppSelector } from "../../app/hooks";

//Redux
import { 
    selectNavigationInformation, 
    setActivePage, NavigationInformationType
} from "../../reducer/navigationReducer";

//CSS
import "../../css/App.scss"

const SongListPage = ()=>{
     
    const navigationInformation = useAppSelector(selectNavigationInformation)
    const dispatch = useAppDispatch();
    const updatedNavigationInformation: NavigationInformationType = {
        homePage:{
            isActive: true
        },
        userProfilePage:{
            isActive: false
        }
    }
        
    useEffect(()=>{
        dispatch(setActivePage(updatedNavigationInformation))
    }, []);

    return (
        <div className="Page">
            <HeaderNav/>
            <SongPreviewList/>
        </div>
    )
}

export default SongListPage;