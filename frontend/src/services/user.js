import http from '../http-common.js'

class UserDataService{
    static createUser(username, email, password){
        return http.post('/users/new', {
            username: username,
            email: email,
            password: password
        })
    }
    static getUser(email, password){
        return http.get(`/users?email=${email}&password=${password}`)
    }
    static getSessionUser(){
        return http.get('/users/session')
    }
    static addFavorite(name, artist, audio, image){
        return http.post('/users/favorite', {
            name,
            artist,
            audio,
            image
        })
    }
    static logoutUser() {
        return http.delete('/users/logout')
    }
    static getFavoriteSongs(){
        return http.get('/users/favorites')
    }
}

export default UserDataService