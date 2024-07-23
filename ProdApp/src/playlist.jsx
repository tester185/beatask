import { useEffect,useState,useLayoutEffect,useId,useRef } from "react"
import axios from 'axios'
import Controls from './Controls.jsx'
import Video from "./Video.jsx"
export default function Playlist(){

    
    const [videoinput,setVideoinput]=useState("")
    const [videos,setVideos]=useState([])
    const vod=useRef(null)
    const [progress,setProgress]=useState(null)
    const [progressIntervalId,setProgressIntervalId]=useState(null)
    const [plIntervalId,setplIntervalId]=useState(null)
    const [playState,setPlayState]=useState(null)
    const [timeId,setTimeId]=useState(null)
    const [controller,setController]=useState(null)
    const [finalizer,setFinalizer]=useState(null)
    const [muted,setMuted]=useState(false)
    const [sid,setSid]=useState(null)
    const nextButton=useRef(null)
    const pauseButton=useRef(null)
    const playButton=useRef(null)
    const exitButton=useRef(null)
    
  const [playStyle,setPlayStyle]=useState
  ({
    display:"none",
    position: "absolute",
    top:"65%",
    height:"5em",
    width:"5em",
    border: "0.08em solid black",
    borderRadius:"50em" ,
    opacity: "0%",
    transition: "0.2s all"

  })
    const [unorderedStyle,setUnorderedStyle]=useState({
      
      display: "block",
      border: "0.08em solid black",
      borderRadius:"0.5em" ,
      padding: "2em 1em",
      transition: "0.2s"

    })
    const [controlsStyle,setControlsStyle]=useState({
      
    position: "relative",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    backgroundColor: "rgba(10, 69, 138, 0.322)",
    height: "15em",
    width: "100%",
    zIndex: "5",
    transition: "0.2s all",
    padding:"4em",
    border: "0.08em solid black",
    borderRadius:"0.5em" ,paddingTop:"4em"
  
    })
    axios.defaults.withCredentials=true
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  
    useLayoutEffect(()=>{
    axios.get('https://productivityappbackend-586f.onrender.com/getvideos')
    .then((res)=>{
      console.log("got videos")
      console.log(res.data)
      if(res.data.message!="error"){
        console.log("got videos")
        console.log(res.data)
     setVideos(res.data.videos)
     if(res.data.videos)
     setProgress({index:0,duration:res.data.videos[0].duration})

      }
      else{
        console.log("error getting videos")
      }

    })
    .catch((e)=>console.log("Error"))
    .finally(()=>console.log("done"))
    },[])

  function addVideo(){
    if(videoinput && videoinput.length){
      console.log("sent")
       axios.post('https://productivityappbackend-586f.onrender.com/addvideo',{data:{link:videoinput}})
       .then((res)=>{
          setVideoinput("")
          
          if(res.data.message!="error"){
            //add video

            setVideos((prevvideos)=>{
              return [...prevvideos,res.data.video]
            })
            if(!progress)
            setProgress({index:0,duration:res.data.video.duration})
          }

       })
       .catch((e)=>{
        console.log("error adding video")

       })
    }


  }
  function updateVideoInput(e){
    setVideoinput(( e.target.value))
  }
  function deleteVideo(e){
    let id=(e.target.parentElement.parentElement).children[1].id
    axios.delete('https://productivityappbackend-586f.onrender.com/deletevideo',{data:{id:id}})
    .then((res)=>{
        if(res.data.message!="error"){
            setVideos((oldvideos)=>{
               return  oldvideos.filter((video)=>{
                        return (video.link!=id)
                })
            })


        }
        else{
            console.log("error removing video backend")
        }
    })
    .catch(()=>{
        
        console.log("error removing video")
    })

  }
  function UnMute(){
    let video=controller[videos[progress.index].link]
    console.log(muted)
    console.log(video)
    if(playState){
      if(muted){
        
      video.unMute()
      }
    else {video.mute();}
    setMuted((prevmute)=>!prevmute)
    }
  }
  
  useEffect(()=>{
    if(playState){

      let id=setTimeout(()=>{
        if(finalizer){
          console.log("go NEXt")
          setPlayState(false)
          let newprog={index:(progress.index+1)%(videos.length),duration:videos[(progress.index+1)%(videos.length)].duration}
        
          let video=controller[videos[newprog.index].link]
          
          setProgress((prevprog)=>{
            
              //video ended go next
              //start new video
             
              return newprog
  
            
          })
          if(video){
            setPlayState(true)
            setFinalizer(false)
            video.playVideo()
let sid=setTimeout(()=>{
  video.seekTo(0)},1000)
  setSid(sid)
          }//*************** */
          
        }
        else{
          setProgress((prevprog)=>{
            return {...prevprog,duration:prevprog.duration-1}
          })
        }
        },1000)
        setTimeId(id)
  

        }
    

  },[playState,progress,finalizer])
  function stopAllVideosExcept(id){
    videos.forEach((video)=>{
    if(video.link!=id){
      
    let v= controller[video.link]
     v.stopVideo()
    }


    })
  }
  function startPlayList(){

    if(progress&&!playState){
    stopAllVideosExcept(videos[progress.index].link)
    let control=document.getElementById('ul')
    control.scrollTop="0"
    let video=controller[videos[progress.index].link]
    if(video){
      /* redesign****************************************/
    setControlsStyle((prevstyle)=>{
      return {...prevstyle,height:"17em",marginBottom:"2em",
        paddingTop:"0"}
    })
    setUnorderedStyle((prevstyle)=>{
      return {...prevstyle,overflowY:"hidden"}
    })

    playButton.current.className='blur'
    pauseButton.current.className=''
    nextButton.current.className=''
    setPlayStyle((prevstyle)=>{
      return {...prevstyle,display:"block"}
    })
    setTimeout(()=>{
    setPlayStyle((prevstyle)=>{
      return {...prevstyle,opacity:"100%"}
    })},200)
    /*********************** ******************************/
     

      console.log(video)
      console.log(progress)
      console.log("playing")
      video.playVideo()
      if(playState==null){
        video.setVolume(0)
      let sid=setTimeout(()=>{
        video.seekTo(0)
        video.setVolume(100) },2000) 
        setSid(sid)
      

      }
        setPlayState(true)
    }
    }
    
  }
  function playit(){
    console.log("play")
    let video=controller[videos[progress.index].link]
    video.playVideo()
  }
  function exit(){
    
    
    playButton.current.className=''
    pauseButton.current.className=''
    nextButton.current.className='blur'
    
  setPlayStyle((prevstyle)=>{
    return {...prevstyle,opacity:"0%"}
  })
  setTimeout(()=>{
  setPlayStyle((prevstyle)=>{
    return {...prevstyle,display:"none"}
  })},200)
  setControlsStyle((prevstyle)=>{
    return {...prevstyle,height:"15em",marginBottom:"0",paddingTop:"4em"
  }
  })
  setUnorderedStyle((prevstyle)=>{
    return {...prevstyle,overflowY:"scroll"}
  })
  stopAllVideosExcept('')
  setPlayState(null)
  clearInterval(timeId)
  setTimeId(null)
  if(sid)
  clearTimeout(sid)
  setSid(null)
  if(videos&&videos.length){
    setProgress({index:0,duration:videos[0].duration})

  }
  else setProgress(null)

  }


  function pausePlayList(){
    if(progress&&playState){
      
    let video=controller[videos[progress.index].link]
    if(video){
      playButton.current.className=''
      pauseButton.current.className='blur'
      nextButton.current.className='blur'
      
    setTimeout(()=>{
    setPlayStyle((prevstyle)=>{
      return {...prevstyle,opacity:"0%"}
    })},200)
      setPlayState(false)
       video.pauseVideo()
    }
    }
    
  }
  function next(){
    if(playState){
    setPlayState(false)
    clearTimeout(timeId)
    setTimeId(null)
    let video=controller[videos[progress.index].link]
    if(video)
    (video).stopVideo()
    setProgress((prevprog)=>{
      return {...prevprog,duration:0}
    })
    setFinalizer(true)
    setPlayState(true)

    }
    /*
    setProgress((prevprog)=>{
      return {...prevprog,duration:0}
    })*/
    //*************** */

  }
function getVideoDuration(){}
  

    return (
        <div className='video-container'>
        <ul className='vl' style={unorderedStyle} id="ul">
          {controller&&<Controls mutePlayList={UnMute} muted={muted} controlsStyle={controlsStyle} playButton={playButton} pauseButton={pauseButton} playStyle={playStyle} nextButton={nextButton} exitButton={exitButton} next={next} exit={exit} startPlayList={startPlayList} pausePlayList={pausePlayList}/>}
          {videos.length ?videos.map((video)=>{
            return(
            <Video key={video.link} id={video.link}  setController={(e)=>setController(e)}/>)})
            :
            "No Videos Added"}
        </ul>
        <input onChange={(e)=>updateVideoInput(e)} className='playlist-input' type='text' placeholder='Youtube Video Link Here' value={videoinput}></input>
        <button onClick={addVideo}>ADD Video</button>
        
         </div>
    )
}