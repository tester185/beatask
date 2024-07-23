import { useState , useEffect,useLayoutEffect } from "react"
export default function Pomodoro(){
    const [seconds,setseconds]=useState(0)
    const [minutes,setminutes]=useState(25)
    const [state,setState]=useState(true)
    const [start,setstart]=useState(false)
    const [tid,setTid]=useState(null)
    const [dynamic,setDyncamic]=useState("")
    const [dynamicTitle,setdynamicTitle]=useState("")
    const [pomvalue,setPomvalue]=useState(1)
    const timer=[
        {
            work:25,
            rest:5,
        },
        {
            work:30,
            rest:5,
        },
        {
            work:35,
            rest:10,
        },
        {
            work:40,
            rest:10,
        },
        {
            work:45,
            rest:15,
        },
        {
            work:50,
            rest:15,
        },
        {
            work:55,
            rest:20,
        },
        {
            work:60,
            rest:20,
        },
    ]
    function go(){
        if(!start){
            
        setminutes(timer[pomvalue-1].work)
        setstart(true)
        }

    }
    useEffect(()=>{
        if(start){
            const id=setTimeout(()=>{
                if(seconds==0){
                    if(minutes>0){setminutes(minutes-1);setseconds(59)}
                    else{
                //done
                if(state){
                    //means going to rest
                    setDyncamic("rest")
                    setdynamicTitle("rest-title")
                    setminutes(timer[pomvalue-1].rest)

                }
                else{
                    //going back to work
                    setDyncamic('')
                    setminutes(timer[pomvalue-1].work)

                }
                setState(!state)
                
            }
                }
                else setseconds(seconds-1)
                  //clearing section
                  clearTimeout(tid) 
                  setTid(null)
                  //************ */
                  },1000)
            setTid(id)
        }

    },[minutes,seconds,start])
     function done(){
        if(start){
            
        setDyncamic('')
        setdynamicTitle('')
        setState(true)
        setstart(false)
        if(tid)clearTimeout(tid)
        setTid(null)
        setminutes(timer[pomvalue-1].work)
        setseconds(0)
        }

     }
     function changePomodoro(e){
        let index=e.target.value
            console.log(index)
        if(index){
            done();
            setPomvalue(index)
            setminutes(timer[index-1].work)

        }

     }
      return(
    <div id='pom-container' className={dynamic}>
    <span id="pom-title"><h3 >Pomodoro</h3><br/>
    <select id="select" onChange={(e)=>changePomodoro(e)}>
        <option className="option" value="1">25/5</option>
        <option className="option" value="2">30/5</option>
        <option className="option" value="3">35/10</option>
        <option className="option" value="4">40/10</option>
        <option className="option" value="5">45/15</option>
        <option className="option" value="6">50/15</option>
        <option className="option" value="7">55/20</option>
        <option className="option" value="8">60/20</option>
    </select>
    </span>
    <span id="pom-state" className={dynamicTitle}><h3 >{state?'Work':'Rest'}</h3></span>
    <span id="pom-remaining"><h3 >Remaining Time</h3></span>
    <div id="time">

    <span id='minutes'>{minutes<10?"0"+minutes:minutes}</span>
    <span>:</span>
    <span id='seconds'>{seconds<10?"0"+seconds:seconds}</span>
   
    </div>
    <div className="pomo-control">
        <button onClick={go}>Start</button>
        <button onClick={done}>Stop</button>
    </div>
  </div>)

}