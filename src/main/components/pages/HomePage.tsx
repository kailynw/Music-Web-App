import React from "react";
import HeaderNav from "../navigation/HeaderNav";
import svg from "../../../assets/music-notes-svgrepo-com.svg"
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "@mui/material";

const HomePage = ()=>{
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
      } = useAuth0();
    
    console.log("Is authenticated?", isAuthenticated)
    console.log(user)
    
    return(
        <div className='HomePage'>
            <HeaderNav/>
            <div className="content">
                {/* <Container> */}
                    <h1>Your Sound, Your Wave—Join the Music Revolution</h1>
                    <p>Experience the ultimate music app with curated playlists, powerful recommendations, and seamless streaming.</p>
                {/* </Container> */}
            </div>

                {/* <button onClick={()=>loginWithRedirect()} className="text">login</button>
                <button onClick={()=>logout()} className="text">logout</button> */}

        </div>
    )
}

export default HomePage