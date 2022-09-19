import React, {useEffect, useState} from 'react';
import User from '../services/user.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from "react-router-dom";
import CustomAlert from './CustomAlert.js';

export default function Login(){
    const [isLogin, setLogin] = useState(true)
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [registrationData, setRegistrationData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [IsregistrationValid, setIsRegistrationValid] = useState({
        username: true,
        email: true,
        password: true,
        confirmPassword: true
    })
    const [registrationAlert, setRegistrationAlert] = useState(false)
    const [loginAlert, setLoginAlert] = useState(false)
    const [registrationFailAlert, setRegistrationFailAlert] = useState(false)
    const [loginFailAlert, setLoginFailAlert] = useState(false)
    const navigate = useNavigate()
    const pattrens = {
        username : /[A-Za-z0-9]{4,20}/,
        email: /([A-Za-z0-9\.#$]{5,})@([a-z]+)\.([a-z]+)/,
        password: /(?=.*[A-Za-z]+)(?=.*[0-9]+)(?=.*[!@#$%&^*]+)(?=.*[A-Za-z0-9!@#$%&^*]{10,})/
    }

    useEffect(()=> {
        setIsRegistrationValid({...IsregistrationValid, ...{
            username: pattrens['username'].test(registrationData.username),
            email: pattrens['email'].test(registrationData.email),
            password: pattrens['password'].test(registrationData.password),
            confirmPassword: registrationData.password === registrationData.confirmPassword
        }})
    }, [registrationData])
    async function registerUser(){
        for (const key in IsregistrationValid){
            if (!IsregistrationValid[key]) {
                setRegistrationFailAlert(true)
                return
            }
        }
        const response = await User.createUser(registrationData.username, registrationData.email, registrationData.password)
        if (response.data.message === 'success'){
            setRegistrationAlert(true)
            setLogin(true)
        }
    }
    async function loginUser(){
        const response = await User.getUser(loginData.email, loginData.password)
        const user = response.data.user
        if (user !== null) {
            setLoginAlert(true)
        } else {
            setLoginFailAlert(true)
        }

    }
    function renderLogin(){
        return (
            <>
                <div className="input-container">
                    <input type="email" placeholder="Email" id="email" value={loginData.email} onChange={(e) => {
                        setLoginData({...loginData, ...{email: e.target.value}})
                    }} required={true} />
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Password" id="password" value={loginData.password} onChange={(e) => {
                        setLoginData({...loginData, ...{password: e.target.value}})
                    }} required={true} />
                </div>
                <div className="button-container">
                    <button className="btn" type="submit">Login</button>
                </div>
            </>
        )
    }
    function renderRegister(){
        return (
            <>
                <div className="input-container">
                    <input type="text" placeholder="Username" value={registrationData.username} onChange={(e)=> {
                        setRegistrationData({...registrationData, ...{username: e.target.value}})
                    }} className={IsregistrationValid.username?'':'invalid-field'} />
                </div>
                <p className="error-para">{IsregistrationValid.username?'':'Create a unique username.'}</p>
                <div className="input-container">
                    <input type="email" placeholder="Email" id="email" value={registrationData.email} onChange={(e)=> {
                        setRegistrationData({...registrationData, ...{email: e.target.value}})
                    }} className={IsregistrationValid.email?'':'invalid-field'} />
                </div>
                <p className="error-para">{IsregistrationValid.email?'':'Invalid email.'}</p>
                <div className="input-container">
                    <input type="password" placeholder="Password" id="password" value={registrationData.password} onChange={(e)=> {
                        setRegistrationData({...registrationData, ...{password: e.target.value}})
                    }} className={IsregistrationValid.password?'':'invalid-field'}/>
                </div>
                <p className="error-para">{IsregistrationValid.password?'':'Password must contain a symbol, letter and digit.'}</p>
                <div className="input-container">
                    <input type="password" placeholder="Re-enter Password" id="confirmpassword" value={registrationData.confirmPassword} onChange={(e)=> {
                        setRegistrationData({...registrationData, ...{confirmPassword: e.target.value}})
                    }} className={IsregistrationValid.confirmPassword?'':'invalid-field'} />
                </div>
                <p className="error-para">{IsregistrationValid.confirmPassword?'':'Passwords do not match'}</p>
                <div className="button-container">
                    <button className="btn" type="submit">Register</button>
                </div>
            </>
        )  
    }
    function renderFooter(){
        return (
            <div className="form-footer">
                <a className="primary" href="google.com">Forgot your password?</a>
            </div>
        )
    }
    return (
        <div className="form-container-parent">
            <div className="form-container">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (!isLogin) registerUser()
                    else loginUser()
                }}>
                    <div className="form-header">
                        <h2 className={isLogin?'active':null} onClick={()=> {
                                    setLogin(true)
                                }
                            }>LOGIN</h2>
                        <h2 className={isLogin?null:'active'} onClick={()=> {
                                setLogin(false)
                            }
                            }>REGISTER</h2>
                    </div>
                    {isLogin?renderLogin():renderRegister()}
                    {isLogin?renderFooter():<></>}
                </form>
            </div>
            <CustomAlert flag={registrationAlert} callback={setRegistrationAlert} callbackParameter={false} 
                title={"Registration Successful"} />
            <CustomAlert flag={loginAlert} callback={navigate} callbackParameter={'/'} 
                title={"Login Successful"} />
            <CustomAlert flag={registrationFailAlert} callback={setRegistrationFailAlert} callbackParameter={false} 
                title={"Invalid Data"} />
            <CustomAlert flag={loginFailAlert} callback={setLoginFailAlert} callbackParameter={false} 
                title={"Invalid Email or Password"} />
        </div>
    )
}
