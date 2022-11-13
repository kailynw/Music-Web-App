import React from "react";
import { Link } from "react-router-dom";
import '../css/components/SongPreviewPostedUserLink.scss'

interface SongPreviewPostedUserLinkPropsType{
    userId: number,
    userName: string
}

const SongPreviewPostedUserLink = (props: SongPreviewPostedUserLinkPropsType)=>{
    return(
        <Link className="user-profile-link" to={`/user/${props.userId}`}> {props.userName} </Link>
    )
}

export default SongPreviewPostedUserLink;