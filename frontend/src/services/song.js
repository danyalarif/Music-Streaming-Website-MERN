import http from '../http-common.js'
import axios from 'axios'
export default class SongDataService{
    static getSongs(){
        return http.get('/songs/')
    }
    static uploadSong(audio){
        axios.post("http://localhost:5000/api/v1/music-streaming/songs/upload", audio, {
          }).then((response) => {
            console.log("The file is successfully uploaded");
        }).catch((error) => {
            console.log(error)
    });
    }
}