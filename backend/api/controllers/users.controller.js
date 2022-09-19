import Userdao from "../../dao/Userdao.js";
export default class UserController{
    static async apiGetUsers(req, res, next){
        const userDocuments = await Userdao.getUsers()
        res.send(userDocuments)
    }
    static async apiGetSessionUser(req, res, next){
        //retrieve session from database
        const user = await Userdao.getSessionUser()
        res.send({user: user})
    }
    static async apiGetUser(req, res, next){
        const email = req.query.email
        const password = req.query.password
        const user = await Userdao.getUser(email, password)
        if (user !== null) req.session.user = {'email' : email, 'password' : password}
        res.send({user: user})
    }
    static async apiPostUser(req, res, next){
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        await Userdao.addUser(username, email, password)
        res.send({message : "success"})
    }
    static async apiPostFavorite(req, res) {
        const name = req.body.name
        const artist = req.body.artist
        const audio = req.body.audio
        const image = req.body.image
        const song = {
            name,
            artist,
            audio,
            image
        }
        const user = await Userdao.getSessionUser()
        console.log(user)
        await Userdao.addFavorite(song, user)
    }
    static async apiLogoutUser(req, res){
        const response = await Userdao.deleteSession()
        res.send({message: "success"})
    }
    static async getFavoriteSongs(req, res) {
        const user = await Userdao.getSessionUser()
        const songsList = await Userdao.getFavorites(user)
        res.send({songsList: songsList})
    }
}