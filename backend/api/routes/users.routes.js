import express from 'express'
import UserController from '../controllers/users.controller.js'
const userRouter = express.Router()

//userRouter.get('/', UserController.apiGetUsers)
userRouter.get('/', UserController.apiGetUser)
userRouter.get('/session', UserController.apiGetSessionUser)
userRouter.post('/new', UserController.apiPostUser)
userRouter.post('/favorite', UserController.apiPostFavorite)
userRouter.delete('/logout', UserController.apiLogoutUser)
userRouter.get('/favorites', UserController.getFavoriteSongs)

export default userRouter