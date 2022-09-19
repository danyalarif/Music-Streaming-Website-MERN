import SongsList from "./SongsList";

export default function Search(){
    return (
        <div>
            <div className="music-search-form-container">
                <form>
                    <input type="text" className="custom-search-field" />
                </form>
            </div>
            <SongsList songs={songs} header={"search results"}  />
        </div>
    )
}

let songs = [
    {
        id: 340,
        name: 'Let me down Slowly',
        artist: 'Alec Banjman',
        image: require("../assets/sample.jpg"),
        audio: require('../assets/Alec Benjamin - Let Me Down Slowly (Lyrics).mp3')
    },
    {
        id: 3432,
        name: 'House on Fire',
        artist: 'Sia',
        image: require("../assets/sample.jpg"),
        audio: require('../assets/Sia - House On Fire (Audio).mp3')
    }
]