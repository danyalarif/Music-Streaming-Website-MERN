//Refactor 1 - create image buttons as a separate component

import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SongsContext } from './Home'

export default function Player(){

    const location = useLocation()
    const userSongs = [...location.state.userSongs]
    const MUSIC_TIME_JUMP_INTERVAL = 10

    const [isPlaying, setIsPlaying] = useState(false)
    const [isVolumeShown, setIsVolumeShown] = useState(false)
    const [song, setSong] = useState({...location.state.song})
    const [music, setMusic] = useState(new Audio(song.audio))
    const [musicData, setMusicData] = useState({
        currentTimeStamp: music.currentTime,
        //volume: music.volume
        //duration: music.duration    -does not work since useState is async
    })

    useEffect(()=> {
        const interval = setInterval(()=> {
            setMusicData({...musicData, ...{currentTimeStamp: music.currentTime}})
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    useEffect(()=>{
        if (isPlaying) music.play()
        else music.pause()
    }, [isPlaying])
    useEffect(()=> {
        //when song is running
        if (musicData.currentTimeStamp === music.currentTime) setIsPlaying(false)
    }, [musicData.currentTimeStamp, music.currentTime])
    useEffect(()=> {
        setMusic(new Audio(song.audio))
    }, [song])

    function playNextSong(id){
        const index = userSongs.findIndex(song => {
            return id === song._id
        })
        console.log(userSongs)
        if (index === userSongs.length - 1) return
        if (isPlaying) setIsPlaying(false)
        setSong(userSongs[index + 1])
        console.log('Here')
    }
    function playPreviousSong(id){
        const index = userSongs.findIndex(song => {
            return id === song._id
        })
        if (index === 0) return
        if (isPlaying) setIsPlaying(false)
        setSong(userSongs[index - 1])
    }

    return (
        <div className = "music-player-container">
            <div className='music-player-image-container'>
                <img src={song.image} alt="album" ></img>
            </div>
            <div className='music-player-progress-container'>
                <div className='music-player-time-stamps-container'>
                    <div className='current-time-stamp'>
                        <span>{secondsToTimeFormat(music.currentTime)}</span>
                    </div>
                    <div className='end-time-stamp'>
                        <span>{secondsToTimeFormat(music.duration)}</span>
                    </div>
                </div>
                <div className='music-player-progress-bar-container'>
                    <div className='progress' style={{
                            width: ((music.currentTime / music.duration) * 100).toString() + '%'}
                        }>
                    </div>
                </div>
            </div>
            <div className='music-player-content-container'>
                <div className='music-player-header'>
                    <div className='music-player-song-name-container'>
                        <span>{song.name}</span>
                    </div>
                    <div className='music-player-artist-name-container'>
                        <span>{song.artist}</span>
                    </div>
                </div>
                <div className='music-player-buttons-container'>
                    <div className="player-button-container">
                        <button className='player-button' onClick={()=> playPreviousSong(song._id)}><img width={40} 
                        src={require('../assets/previous.svg').default} alt='previous' /></button>
                    </div>
                    <div className="player-button-container">
                        <button className='player-button' onClick={()=> {
                            if (music.duration < MUSIC_TIME_JUMP_INTERVAL)
                                music.currentTime = 0
                            else
                                music.currentTime = music.currentTime - MUSIC_TIME_JUMP_INTERVAL
                        }}><img width={40} 
                        src={require('../assets/backward.svg').default} alt='backward' /></button>
                    </div>
                    <div className="player-button-container">
                        <button className='player-button filled' onClick={()=> {
                            setIsPlaying(!isPlaying)
                        }}><img width={40} 
                        src={!isPlaying?require('../assets/play.svg').default:require('../assets/pause.svg').default} 
                        alt='pause'
                         /></button>
                    </div>
                    <div className="player-button-container">
                        <button className='player-button' onClick={()=> {
                            if (music.duration - music.currentTime < MUSIC_TIME_JUMP_INTERVAL)
                                music.currentTime = music.duration
                            else
                                music.currentTime = music.currentTime + MUSIC_TIME_JUMP_INTERVAL
                        }}><img width={40} 
                        src={require('../assets/forward.svg').default} alt='forward'/>
                        </button>
                    </div>
                    <div className="player-button-container">
                        <button className='player-button' onClick={()=> playNextSong(song._id)}><img width={40} src={require('../assets/next.svg').default} alt='next' /></button>
                    </div>
                </div>
                <div className='music-player-mute-container'>
                    <input className="volume-slider" type="range" min="0" max="100" step="10" style={{
                        display: isVolumeShown?'block':'none'
                    }}  onChange={(e)=> {
                        music.volume = e.target.value / 100
                        setMusicData({...musicData, ...{volume: e.target.value / 100}})
                    }} />
                    <button className='player-button' onClick={()=> {
                        setIsVolumeShown(!isVolumeShown)
                    }}><img width={40} 
                    src={require('../assets/volume.svg').default} alt="volume" /></button>
                </div>
            </div>
        </div>
    )
}


function secondsToTimeFormat(seconds){
    const s = Math.floor(seconds) % 60
    const m = Math.floor(Math.floor(seconds) / 60)
    const secondsString = s < 10 ? '0' + s : s
    const minutesString = m < 10 ? '0' + m : m
    return minutesString + ':' + secondsString
}