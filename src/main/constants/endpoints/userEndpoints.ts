
const api_host = process.env.REACT_APP_MUSIC_API_HOST

const UserEndpoints = {
    GET_USERS: `${api_host}/users`,
    LOGIN_USER: `${api_host}/user/auth/login`,
    EDIT_USER_PROFILE: (userId: number)=>{
        return `${api_host}/user/edit/${userId}`
    }
}

export default UserEndpoints;