import React from "react"
import { Link } from "react-router-dom"
export default function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar-header">
                <h1>MUSIC STREAMING</h1>
            </div>
            <div className="navbar-side-content-container">
                <div>
                    <button className="btn btn--secondary">Upload Now</button>
                </div>
                <div className="navbar-tags">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}