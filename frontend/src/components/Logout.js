import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserDataService from "../services/user.js"

export default function Logout(){
    const navigate = useNavigate()
    useEffect(() => {
        async function logout(){
            const result = await UserDataService.logoutUser()
            navigate('/login')
        }
        logout()
    }, [])
    return (<></>)
}