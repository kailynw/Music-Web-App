import React from "react";
import { Link } from "react-router-dom";
import '../../css/components/SongPreview.scss'

interface SongPreviewPostedUserLinkPropsType {
    userId: number,
    userName: string
}

const SongPreviewPostedUserLink = (props: SongPreviewPostedUserLinkPropsType) => {
    return (
        <Link className="profile-link" to={`/user/${props.userId}`}> {props.userName} </Link>
    )
}

export default SongPreviewPostedUserLink;