import mongodb from 'mongodb'

let songs = undefined
const SERVER_BASE_URL = "http://localhost:5000"
export default class Songdao{
    static async injectDB(conn){
        if (songs) return
        try{
            songs = await conn.db(process.env.MUSIC_STREAMING_DB_NAME).collection("Songs")            
        } catch(error) {
            console.log(error)
        }
    }
    static async getSongs(){
        let songsList = undefined
        try{
            songsList = await songs.find().toArray()
            //appending base url to path
            songsList.forEach(song => {
                song.image = SERVER_BASE_URL + song.image
                song.audio = SERVER_BASE_URL + song.audio
            })
        } catch(error) {
            console.log(error)
        }
        return songsList
    }
    static async addSong(name, artist, image, audio){
        try {
            const insert = await songs.insertOne({"name" : name, "artist" : artist, "image" : image, "audio" : audio})
        } catch(error) {
            console.log(error)
        }
    }
    static async deleteSong(id){
        try{
            const deleteResult = await songs.deleteOne({_id: id})
        } catch(error) {
            console.log(error)
        }
    }
}