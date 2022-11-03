import React, { useEffect } from 'react'
import HeaderNav from '../navigation/HeaderNav';
import UserProfileComponent from '../UserProfileComponent';

const UserProfilePage = ()=>{
    return(
        <div>
            <HeaderNav/>
            <UserProfileComponent/>
        </div>
    )

}

export default UserProfilePage;
