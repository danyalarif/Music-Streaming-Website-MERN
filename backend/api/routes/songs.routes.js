import multer from 'multer'
import express from 'express'
import SongsController from '../controllers/songs.controller.js'
const songRouter = express.Router()


songRouter.get('/', SongsController.apiGetSongs)
songRouter.delete('/delete', SongsController.apiDeleteSong)
songRouter.post('/upload', multer({dest: 'public/songAudios/'}).single('file'), SongsController.apiAddSong)
export default songRouter