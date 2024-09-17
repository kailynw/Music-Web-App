
const api_host = process.env.REACT_APP_MUSIC_API_HOST

const SongsEndpoints = {
    GET_ALL_SONGS: `${api_host}/songs`,
    GET_SONGS_BY_USER_ID: (userId: string | undefined)=>{
        //"http://localhost:8080/users/5/songs
       return `${api_host}/users/${userId}/songs`
    }
}

export default SongsEndpoints;