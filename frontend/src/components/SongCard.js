import React, {useContext} from "react"
import { useNavigate } from "react-router-dom"
import { SongsContext } from "./Home"
import UserDataService from "../services/user.js"
export default function SongCard({song, deleteUserSong}){
    const {userSongs} = useContext(SongsContext)
	const navigate = useNavigate()

	return (
        <div className="song-container col-12 col-sm-6 col-md-3 col-lg-2 col-xl-2" onClick={()=> {
			navigate(`/player/${song._id}`, {state: {song: song, userSongs: userSongs}})
		}}>
			<div className="song">
				<div className="song-image-container"> 
					<img className="song-image" src={song.image} alt={song.name} />
				</div>
				<div className="song-body">
					<div className="song-category-container">
						<a href="test.com" className="song-category"></a> 
						<span className="song-mainCategory" hidden></span> {/*I have no idea why i used hidden here*/} 
					</div>
					<div className="song-name-container"> 
						<span className="song-name">{song.name}</span>
					</div>
					<div className="song-artist-container"> 
						<span className="song-artist">{song.artist}</span>
					</div>
					<div className="song-footer-container">
						<div className="cart-container" onClick={(e)=> {
								e.stopPropagation()
								deleteUserSong(song._id)
							}}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
							<path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
							</svg>
							<span>DELETE</span>
						</div>
						<div className="wishlist-container" onClick={async (e)=> {
							e.stopPropagation()
							const result = await UserDataService.addFavorite(song.name, song.artist, song.audio, song.image)
						}}>
							<svg className="mu-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
							</svg>
							<span>FAVORITES</span>
						</div>
					</div>
				</div>
			</div>	
		</div>
    )
}