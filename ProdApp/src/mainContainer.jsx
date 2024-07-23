
import Task from "./Task"
function MainContainer(props){
const updateit=props.updateTodos
const todoItems=props.todoItems
const deleteit=props.deleteTask
    

return (
    <div className="main" id="todo-main">
      <div className='taskContainer'>
        <ul className='unordered'>
          {todoItems && todoItems.length===0 && <div className='panel'>No Tasks Added Yet</div>}
          {todoItems && todoItems.map((item)=>{
            
           return (
            <Task 
            key={item.id}
            updateit={updateit}
            deleteit={deleteit}
            item={item}
            />
        )
          })}
        </ul>
      </div>
     </div>
)
}
export default MainContainer