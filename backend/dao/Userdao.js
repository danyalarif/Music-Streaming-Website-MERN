import mongodb from "mongodb"

let users = undefined
let session = undefined
export default class Userdao{
    static async injectDB(conn){
        if (users) return
        try{
            users = await conn.db(process.env.MUSIC_STREAMING_DB_NAME).collection("User")
            session = await conn.db(process.env.MUSIC_STREAMING_DB_NAME).collection("sessions")
        }
        catch(error) {
            console.log("Error while creating user collection " + error)
        }
    }
    static async getUsers(){
        if (!users) return
        let userDocuments
        try{
            userDocuments = await users.find().toArray()
        }
        catch(error) {
            console.log(error)
        }
        return userDocuments
    }
    static async getUser(email, password){
        if (!users) return
        let user
        try{
            user = await users.findOne({$and: [{"email": email}, {"password": password}]})
        }
        catch(error) {
            console.log(error)
        }
        return user
    }
    static async addUser(username, email, password){
        if (!users) return
        try{
            const insertResult = await users.insertOne({"username": username, "email": email, "password": password})
            console.log(insertResult)
        }
        catch(error){
            console.log(error)
        }
    }
    static async getSessionUser(){
        try{
            const sessionDocument = await session.findOne()
            if (sessionDocument === null) return
            const user = JSON.parse(sessionDocument.session).user
            return user
        } catch(error) {
            console.log(error)
        }
    }
    static async addFavorite(song, user) {
        try {
            const documents = await users.findOne({$and: [{"email": user.email}, { "favorites": { $ne: null } }]})
            if (documents === null) {       //if array does not exist create it
                const songArray = []
                songArray.push(song)
                await users.updateOne({"email" : user.email}, {$set : {"favorites" : songArray}})
            } else {
                await users.updateOne({"email" : user.email}, {$push : {"favorites": song}})
            }
        } catch(error) {
            console.log(error)
        }
    }
    static async deleteSession(){
        try{
            const res = await session.deleteMany({})
        } catch(error) {
            console.log(error)
        }
    }
    static async getFavorites(user){
        let songsList = undefined
        try{
            const collection = await users.findOne({"email" : user.email})
            songsList = collection.favorites
        } catch(error) {
            console.log(error)
        }
        return songsList
    }
}