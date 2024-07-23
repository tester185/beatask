import { useState } from "react";
function TodoForm(props){
let addTask=props.onSubmit
const [iteminput,setiteminput]=useState("");

    
  function handleSubmit(e){
    e.preventDefault();
    console.log("added")
    if(iteminput.length){

    addTask(iteminput)
    setiteminput('')
  }}
    return (
        
     <form className="form" onSubmit={handleSubmit}>
     <div className='inputcontainer'>
       <label htmlFor='input'></label>
       <input onChange={e=>setiteminput(e.target.value.toUpperCase())} type='text' id="input" placeholder='Do The Dishes' value={iteminput}/>
     </div>
     <button className='adder' type='submit' >Add Task</button>

    </form>
    )
}
export default TodoForm