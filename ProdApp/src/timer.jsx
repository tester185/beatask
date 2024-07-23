import { useState , useEffect } from "react"
export default function Timer(){
    /*
      setInterval(()=>{
      setseconds((prevs)=>{
        if(prevs>=59){
          setmintues((prevm)=>{
            if(prevm>=59){
              sethours((prevh)=>{
                if(prevh>=23){
                  return 0;
                }
                return prevh+1;
              })
              return 0;
            }
            return prevm+1;
          })
          return 0;
        }
        return prevs+1;

      });
    
    },1000)
      */

    const [seconds,setSeconds]=useState(0)
    const [minutes,setMinutes]=useState(0)
    const [intervalid,setIntervalid]=useState(null)
    useEffect(()=>{
        if(seconds>=59){
          setTimeout(()=>{
          console.log(minutes)
          setMinutes(minutes+1)},1000)
        }
    
        },[seconds])
      function startTimer(){
        if(!intervalid){
    
        const id=setInterval(()=>{
         // console.log("zav")
          setSeconds((prevs)=>{
          
            return (prevs+1)%60
          })
        },1000)
        setIntervalid(id);
        }
      }
      function stopTimer(){
        if(intervalid)
        clearInterval(intervalid);
        setIntervalid(null)
      }
      function resetTimer(){
        if(intervalid)
        clearInterval(intervalid);
        setIntervalid(null)
        setMinutes(0)
        setSeconds(0)
      }
      return(
    <div id='pomodoro-container'>
    <div className="timer">Timer</div>
    <span id='minutes'>{minutes<10?"0"+minutes:minutes}</span>
    <span>:</span>
    <span id='seconds'>{seconds<10?"0"+seconds:seconds}</span>
    <div id='contols'>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  </div>)

}