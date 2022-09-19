import { v4 as uuidv4 } from 'uuid';
import React, {useState, useRef, useEffect} from 'react';
import SongCard from './SongCard';
import SongsList from './SongsList';
import SongDataService from '../services/song.js';
import UserDataService from '../services/user.js';
import { useNavigate } from 'react-router-dom';
export const SongsContext = React.createContext()

export default function Home(){
    const [popularSongs, setPopularSongs] = useState([])
    const [userSongs, setUserSongs] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchSessionUser(){
            const response = await UserDataService.getSessionUser()
            if (response.data.user === undefined) navigate('/login')
            else console.log(response.data.user)
        }
        async function fetchSongs(){
            const response = await SongDataService.getSongs()
            if (response.data.songList === null) return
            setPopularSongs(response.data.songsList)
        }
        async function fetchFavoriteSongs(){
            const response = await UserDataService.getFavoriteSongs()
            //if (response.data.songsList === undefined) return
            setUserSongs(response.data.songsList)
        }
        fetchSessionUser()
        fetchSongs()
        fetchFavoriteSongs()
    }, [])

    const songsContextValue = {
        userSongs: popularSongs
    }

    function deleteUserSong(id){
        setUserSongs(userSongs.filter(song => {return song._id !== id}))
    }
    return (
        <>
            <SongsContext.Provider value={songsContextValue}>
                <SongsList songs={popularSongs} header={"Popular Songs"} deleteUserSong={deleteUserSong} />
                <SongsList songs={userSongs} header={"Favorite Songs"} deleteUserSong={deleteUserSong} />
            </SongsContext.Provider>
        </>
    )
}
