import { useEffect,useRef, useState } from "react";
export default function Video({title,id,deleteVideo,getVideoDuration,setController,setFinalizer}){
   const [videoTtile,setVideoTitle]=useState("")
    const d=getVideoDuration
    let player=null
    let setter=setController

  useEffect(() => {
    // Function to create the player once the YouTube API is ready
    const initializePlayer = () => {
      new window.YT.Player(id, {
        width: '100%',
        videoId: id, // Replace with your desired video ID
        playerVars: {
          mute:0,
          enablejsapi:1,
          modestbranding:1,
          disablekb:0,
          fs:0,
          iv_load_policy:1,
          origin:"*",
          rel:0,
          start:0



          
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    // Callback function called when the player is ready
    const onPlayerReady = async(event) => {
      event.target.setPlaybackQuality('small')
      setVideoTitle(event.target.videoTitle)
      setter((prevcontroller)=>{
        let k={}
        if(prevcontroller)k=prevcontroller
        let newController=k
        console.log(newController)
        newController[id]=event.target
        console.log(newController)
        return newController
          
      })
    };
    
    function onPlayerStateChange(event) {        
        if(event.data === 0) {          
            setFinalizer(true)
        }
    }
    const loadAPI = () => {
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
    };

    if (!window.YT) {console.log("load")
      loadAPI();
    } else {
      console.log("init")
      initializePlayer();
    }

  }, []);

    return(
        <li key={id} className="videoitem" >
              
        <h3>{videoTtile}<button  onClick={(e)=>deleteVideo(e)}>X</button></h3>
        <div id={id} className="player" stopVideo={(e)=>{stopVideo(e)}}></div>
        
      </li> 

    )
}