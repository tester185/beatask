export default function Progress(props){
const progress=props.progress
const showCompleted=props.showCompleted
 const style={
  position: "relative",
  display: "block",
  backgroundColor: "rgba(79, 231, 65, 0.87) ",
  height:"100%",
  width:progress+"%",
  margin: "0",
  borderRadius:" 0.5em",
  transition:"0.2s all"}
return (
    <div id='progress-container'>
    <span id="progress-title">
    <h3>Progress Bar</h3>
    <button id="completed-btn" onClick={showCompleted}>Completed Tasks</button>
    </span>
    <div id='progress'>
      <span id='live' style={style}></span>
    </div>
    </div>
)
}