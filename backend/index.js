import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import Userdao from './dao/Userdao.js' 
import Songdao from './dao/Songdao.js'

dotenv.config()
const port = process.env.port


//setting up database
const MongoClient = mongodb.MongoClient

MongoClient.connect(
    "mongodb+srv://danyal:adminadmin@cluster0.f3ray.mongodb.net/music_streaming?retryWrites=true&w=majority",
    {
        maxPoolSize: 50,
        wtimeoutMS: 20000
    }
    )
    .catch(error => {
        console.log(error) 
        process.exit(1)
    })
    .then(async client => {
        await Userdao.injectDB(client)
        await Songdao.injectDB(client)
       app.listen(process.env.PORT || 3000, () => { console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env); })
    })
