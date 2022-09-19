import Songdao from '../../dao/Songdao.js'
import fs from 'fs'
import {Blob} from 'buffer'

import jsmediatags from 'jsmediatags'

export default class SongsController{
    static async apiGetSongs(req, res, next){
        const songsList = await Songdao.getSongs()
        res.send({songsList: songsList})
    }
    static async apiDeleteSong(req, res){
        await Songdao.deleteSong(req.query.id)
        res.send({message: 'success'})
    }
    static async apiAddSong(req, res){
        const file = req.file
        const fileDestination = `${file.destination}${file.originalname}`
        fs.rename(`${file.destination}${file.filename}`, fileDestination, ()=> {
            //after a file is renamed
            //Retrieving music meta data from file
            return
        })
        const song = await SongsController.#getMusicMetaData(file, fileDestination)
        await Songdao.addSong(song.name, song.artist, song.image, song.audio)
    }
    static async #getMusicMetaData(file, fileDestination){
        const song = {}
        return new Promise((resolve) => {
            jsmediatags.read(`${file.destination}${file.originalname}`, {
                onSuccess: async (tag) => {
                    const tags = tag.tags
                    //retrieving data
                    const title = tags.title??'No name'
                    const artist = tags.artist??'No artist'
                    //retrieving image
                    const image = tags.picture
                    const imagePath = `public/songImages/${title}${Date.now()}.jpg`
                    if (image) {
                        const blob = new Blob([new Uint8Array(image.data)], { type: image.format });
                        const buffer = Buffer.from(await blob.arrayBuffer());
                        fs.writeFile(imagePath, buffer, () => {
                            return
                        });
                    } else {
                        //load default image
                    }
                    //Setting song properties
                    song.name = title
                    song.artist = artist
                    song.image = imagePath.substring(6, imagePath.length)
                    song.audio = fileDestination.substring(6, fileDestination.length)
                    resolve(song)
                }
            })
        })
    }
}