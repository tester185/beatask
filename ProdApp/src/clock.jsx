import { useState , useEffect,useLayoutEffect } from "react"
export default function Clock(){
  let today=new Date();
  let s=today.getSeconds();
  let m=today.getMinutes();
  let h=today.getHours();
    const [seconds,setseconds]=useState(s)
    const [minutes,setminutes]=useState(m)
    const [hours,sethours]=useState(h)
          useEffect(()=>{
            
    setTimeout(() => {
            let today=new Date();
            let s=today.getSeconds();
            let m=today.getMinutes();
            let h=today.getHours();
     
    sethours(h);
    setseconds(s);
    setminutes(m);
    }, 1000);
          },[seconds])
      


      return(
    <div id='clock-container'>
    <span id="clock-title"><h3 >Time</h3></span>
    <div id="time">

    <span id='hours'>{hours<10?"0"+hours:hours}</span>
    <span>:</span>
    <span id='minutes'>{minutes<10?"0"+minutes:minutes}</span>
    <span>:</span>
    <span id='seconds'>{seconds<10?"0"+seconds:seconds}</span>
   
    </div>
  </div>)

}