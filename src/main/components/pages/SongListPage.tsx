import React from "react";
import SongListNav from "../navigation/SongListNav";
import SongPreviewList from '../SongPreviewList';
import "../../css/App.scss"

const SongListPage = ()=>{
    return (
        <div className="Page">
            {/* <HeaderNav/> */}

            <SongListNav/>
            <SongPreviewList/>
        </div>
    )
}

export default SongListPage;