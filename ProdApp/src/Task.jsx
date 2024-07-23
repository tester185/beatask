export default function Task({deleteit,updateit,item}){
    
  function updateTodos(id){
    updateit(id);
  }
  function deleteTask(DeletedItem){
    deleteit(DeletedItem);
  }
    return (
        
        <li key={item.id} >
        <input onChange={()=>updateTodos(item.id)}  type='checkbox' checked={item.status} id='item'/>
        <label htmlFor='item'>{item.name}</label>
        <button onClick={()=>deleteTask(item)} className='deleter'>X</button> 
        </li> 
    )
}