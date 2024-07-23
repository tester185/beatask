import { useState } from "react"
import gif from './assets/7V7.gif';
import mute from './assets/mute.png';
import unmute from './assets/unmute.png';
export default function Controls({mutePlayList,muted, controlsStyle, playButton,pauseButton, playStyle, startPlayList,exit,next,nextButton,exitButton,pausePlayList}){
    
    return (
     <div id="controls" style={controlsStyle}>
      <img id="img" style={playStyle} src={gif}></img>
      <div id="extra-control">
      <button onClick={next} id="next-btn" ref={nextButton}>Next</button>
      <button onClick={exit} id="exit-btn"ref={exitButton}><h4>X</h4></button></div>
      <button onClick={startPlayList} id="play-btn"ref={playButton}>Play</button>
      <button onClick={pausePlayList}  id="pause-btn"ref={pauseButton}>Pause</button>
      <button onClick={mutePlayList} className="pause-btn" id="mute-btn">{muted?<img src={mute}/>:<img src={unmute}/>}</button>
      </div>
    )
}