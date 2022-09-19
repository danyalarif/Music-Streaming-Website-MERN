import { useRef } from "react"
import SongCard from "./SongCard"

export default function SongsList({header, songs, deleteUserSong, moveItemsForward, moveItemsBackward}){
    const itemsContainer = useRef(null)

    return(
        <div className="user-songs-container">
            <div className="items-header extended-container">
                <span>{header}</span>
            </div>
            <div className="items-body-container">
                <div className="left-arrow-container">
                    <button className="btn--transparent" onClick={()=> {
                        const dimensions = itemsContainer.current.getBoundingClientRect()
                        const width = dimensions.width
                        itemsContainer.current.scrollLeft -= width
                    }}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="pink" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg></button>
                </div>
                <div className="container">
                    <div className="items-container" ref={itemsContainer}>
                        {songs.map(song => {
                            return <SongCard song={song} key = {song._id} deleteUserSong={deleteUserSong} />
                        })}
                    </div>
                </div>
                <div className="right-arrow-container">
                    <button className="btn--transparent btn--right" onClick={()=> {
                        const dimensions = itemsContainer.current.getBoundingClientRect()
                        const width = dimensions.width
                        itemsContainer.current.scrollLeft += width
                    }}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="pink" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg></button>
                </div>
            </div>
        </div>
    )
}