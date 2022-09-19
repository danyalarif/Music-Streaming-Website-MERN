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
    process.env.MUSIC_STREAMING_DB_URI,
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
        app.listen(port, ()=> {
            console.log('server listening on port ' + port)
        })
    })
