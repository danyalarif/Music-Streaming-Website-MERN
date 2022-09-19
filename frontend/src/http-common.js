import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/music-streaming",
    headers: {
        "Content-type": "application/json"
        //"Content-type": "multipart/form-data"
    }
})