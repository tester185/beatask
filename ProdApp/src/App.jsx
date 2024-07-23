import { useEffect, useRef, useState } from 'react'
import TodoForm from './todoForm.jsx'
import MainContainer from './mainContainer.jsx'
import Progress from './progress.jsx'
import Timer from './timer.jsx'
import Clock from './clock.jsx'
import Pomodoro from './pomodoro.jsx'
import   './style.css'
import axios from 'axios'
import Playlist from './playlist.jsx'
import CompletedList  from './CompletedList.jsx'

function App(props) {
  let today=new Date();
  const container=useRef(null)
  const part1=useRef(null)
  const part2=useRef(null)

  const [expanded,setExpanded]=useState(false)
  const [lightState,setLightState]=useState(0);
  const [todoItems,settodoItems]=useState([]);
  const [progress,setProgress]=useState(10)
  const [toggleCompleted,setToggleCompleted]=useState(false)
  const [completedTasks,setCompletedTasks]=useState([])
  const [completedStyle,setCompletedStyle]=useState(
{ position: "absolute",
  backgroundColor: "rgba(63, 35, 35, 0.788)",
  left: "40%",
  top: "40%",
  padding: "2em",
  border: "0.1em solid black",
  borderRadius: "0.5em",
  overflowY: "scroll",
  display: "none",
  zIndex: "10",
  maxHeight: "20em",
  opacity: "0%",
  transition:"200ms all"
})
let setAuth=props.setAuth
axios.defaults.withCredentials=true
axios.defaults.headers.common['authorization'] = localStorage.getItem('token');


  function showCompleted(){
    if(!toggleCompleted){
      setToggleCompleted(true)
      setCompletedStyle((prevs)=>{
        return {...prevs,display:"block"}
      })
      setTimeout(()=>{
        setCompletedStyle((prevs)=>{
          return {...prevs,opacity:"100%"}
        })},200)


    }
  }
  useEffect(()=>{
    axios.get('https://productivityappbackend.onrender.com/task')
    .then((res)=>{
      console.log(res.data.tasks)
     settodoItems(res.data.tasks)

    })
    .catch((e)=>console.log("Error"))
    .finally(()=>console.log("done"))

    
    axios.get('https://productivityappbackend.onrender.com/completedTasks')
    .then((res)=>{
      console.log(res.data.tasks)
      console.log(res.data)
     setCompletedTasks(res.data.tasks)

    })
    .catch((e)=>console.log("Error"))
    .finally(()=>console.log("done"))
    
  },[])
  useEffect(()=>{
    //
    if(lightState)
    document.body.className="light"
    else
    document.body.className=""
    //
  },[lightState])
  function addTask(iteminput){
    const task={id:crypto.randomUUID(),status:false,name:iteminput}
    axios.post('https://productivityappbackend.onrender.com/addtask',{data:{task:task}})
    .then((res)=>{
     settodoItems([...todoItems,task])
   

    })
    .catch((e)=>console.log("error adding task")) }
  
  function updateTodos(id){
    axios.post('https://productivityappbackend.onrender.com/updatetask',{data:{taskid:id}})
    .then((res)=>{
      settodoItems((olditems)=>{
        return olditems.map((item)=>{
          if(id==item.id){
            return {...item,status:!item.status}
          }
          return item; 
        })
      })

    })
    .catch((e)=>{console.log("error updating task");})
   
  }
  function deleteTask(DeletedItem){
    axios.delete('https://productivityappbackend.onrender.com/task',{data:{taskid:DeletedItem.id}})
    .then((res)=>{
      settodoItems((old)=>{
       return  old.filter((item)=>{
           return (DeletedItem.id!=item.id);
        })

    }) })
    .catch((e)=>console.log("Error"))
    .finally(()=>console.log("done"))
   
  }
  function clearTasks(){
    axios.post("https://productivityappbackend.onrender.com/cleartask",{data:{tasks:todoItems}})
    .then((res)=>{
      
    settodoItems((currentItems)=>{

      let counter=0;
     let ret= currentItems.filter((item)=>{
      counter+=item.status;
      if(item.status){
        setCompletedTasks((prevt)=>{
          return [item,...prevt]
        })
      }
              return (!item.status);
      })
    setProgress((((parseInt(progress/10)+counter-1)%10)+1)*10)
    return ret


    })
    })
    .catch((e)=>{console.log("error clearing tasks front");})
    

  }
  function changeLight(){
    setLightState(1-lightState)
  }
  function removeCompleted(){
    if(toggleCompleted){
      setToggleCompleted(false)
      setCompletedStyle((prevs)=>{
        return {...prevs,opacity:"0%"}
      })
      setTimeout(()=>{
        setCompletedStyle((prevs)=>{
          return {...prevs,display:"none"}
        })},200)
    }
  }
  function logout(){
    console.log(localStorage.getItem('token'))
    axios.post('https://productivityappbackend.onrender.com/logout').then((res)=>{
      console.log(localStorage.getItem('token'))
      if(res.data.message!="error"){
      localStorage.clear()
        setAuth('false')

      }
      else{
        console.log("error loggin out")
      }
    })

  }
  function expandTodo(){
    if(!expanded){

    part1.current.style.width="200vh"
    part2.current.style.display="none"
    setTimeout(()=>{ 
    part2.current.style.display="flex"
      
      container.current.style.gridTemplateAreas='"p1 p1" "p1 p1" "p2 p2"'},200)
    setExpanded(true)
    }
    else{
      part1.current.style.width="50%"
    setTimeout(()=>{ 
    part2.current.style.display="flex"
      part1.current.style.width="100%"
      
      container.current.style.gridTemplateAreas='"p1 p2" "p1 p2" "p1 p2"'},200)
      

   // container.current.style.gridTemplateAreas='"p1 p2" "p1 p2" "p1 p2"'
    setExpanded(false)

   
    } 

  }
   return (
    <div className='container' ref={container}>
     <CompletedList completedStyle={completedStyle} removeCompleted={removeCompleted} completedTasks={completedTasks} />
     <div className='main' id='p1' ref={part1}>
      <div id='task-container'>
      <span id='top-form'>
      <button onClick={changeLight}>
          <span>{lightState?'Dark Theme':'Light Theme'}</span>
      </button>
      <button onClick={expandTodo} id='todo-expand'>{!expanded?"Expand":"Pack"}</button>
      
      </span>
      <Progress progress={progress} showCompleted={showCompleted}/>
      <TodoForm onSubmit={addTask}/>
      <MainContainer  updateTodos={updateTodos} deleteTask={deleteTask} todoItems={todoItems}/>
      <button onClick={clearTasks}>Clear Tasks</button>
      </div>
      <Playlist/>
     
     </div>
     <div className='main' id='p2' ref={part2}>
     <button id='logout-btn' onClick={logout}>Logout</button>
      <Timer/> 
      <Pomodoro />
      <Clock />
     </div>
    </div>
   )
}

export default App
