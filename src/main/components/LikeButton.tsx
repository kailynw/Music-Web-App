import React, {useState} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

const redLikeButtonStyles: React.CSSProperties = {
    color: "red",
    fontSize: "20px",
    width: "8%"
    
}

const whiteLikeButtonStyles: React.CSSProperties = {
    color: "white",
    fontSize: "20px",
    width: "8%",
}

const LikeButton = ()=>{
    const [likeButtonStyles, setLikeButtonStyles] = useState(whiteLikeButtonStyles)

    const toggleLikeButtonColor = ()=>{
        const color = likeButtonStyles==redLikeButtonStyles ? whiteLikeButtonStyles : redLikeButtonStyles;
        console.log(color)
        setLikeButtonStyles(color)
    }

    return(
        <span onClick={()=> toggleLikeButtonColor()}> 
            <FavoriteIcon style={likeButtonStyles}></FavoriteIcon>
        </span>
    )
}

export default LikeButton;