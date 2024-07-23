
export default function CompletedList({completedStyle,removeCompleted,completedTasks}){
return(
    
    <div id='completed' style={completedStyle}>
      <h3>Completed Tasks <button onClick={removeCompleted}>X</button></h3>
      <ul>{
        completedTasks.map((task)=>{
           return <li className='completed-task'>{task.name}</li>
        })
        }
      </ul>
    </div>
)
}