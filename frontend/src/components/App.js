import React from 'react';
import Login from './Login';
import Navbar from './Navbar';
import Home from './Home';
import Player from './Player';
import BrowseSongs from './BrowseSongs';
import FileUpload from './FileUpload';
import '../css/app.css'; 
import {Route, Routes} from 'react-router-dom'
import UserDataService from '../services/user.js';
import Logout from './Logout.js';

function App() {  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/browse" element = {<BrowseSongs />} />
        <Route path="/player/:_id" element = {<Player />} />
        <Route path="/upload" element = {<FileUpload />} />
        <Route path="/logout" element = {<Logout />} />
      </Routes>
    </>
  )
}

export default App;
