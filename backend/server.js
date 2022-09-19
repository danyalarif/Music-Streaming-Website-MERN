import express from 'express'
import cors from 'cors'
import userRouter from './api/routes/users.routes.js'
import songsRouter from './api/routes/songs.routes.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'


dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

//setting up session
const SESSION_HOURS = 0.5
const maxAge = 1000 * 60 * 60 * SESSION_HOURS
const sessionData = {
    secret: 'secret key here',
    cookie: {
        maxAge: maxAge,
        httpOnly: true,
        signed: true
    },
    store: MongoStore.create({ mongoUrl: process.env.MUSIC_STREAMING_DB_URI }),
    resave: false,
    saveUninitialized: false    //only saves when request object is modified
}
app.use(session(sessionData))
app.use('/api/v1/music-streaming/users', userRouter)
app.use('/api/v1/music-streaming/songs', songsRouter)

app.get('/', function(req, res) {
    req.session.user = {'User' : "hey"}
    res.send(req.session)
});
app.get('/logout', function(req, res) {
    req.session.destroy((error) => {
        if (error) { 
            console.log(error)
        }
    })
});
//app.use('*', (req, res) => {res.status(404).json({error: "Not Found"})})

export default app