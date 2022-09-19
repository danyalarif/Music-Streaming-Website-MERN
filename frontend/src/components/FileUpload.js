import React, {useRef} from "react";
import SongDataService from '../services/song.js'

export default function FileUpload(){
    const file = useRef(null)

    function uploadFile(file){
        let formData = new FormData()
        formData.append('file', file)
        SongDataService.uploadSong(formData)
    }
    return (
        <div className="form-container-parent">
            <div className="form-container">
                <form onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <label htmlFor='file-upload' className="file-upload">
                        <img width={40} src={require('../assets/fileUpload.svg').default} alt='file upload' />
                        <span>Upload Now</span>
                    </label>
                    <input id='file-upload' type='file' style={{display: "none"}} ref={file} onChange={(e)=> {
                        console.log(e.target.files[0])
                        uploadFile(e.target.files[0])
                    }} />
                </form>
            </div>
        </div>
    )
}