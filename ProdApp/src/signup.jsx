import "./login.css"
import { useState ,useRef} from "react"
import axios from "axios"
import MainNav from './MainNav.jsx'
export default function Login(props){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [notif,setNotif]=useState("")
  const setAuthPage=props.setAuthPage
  const [notifId,setNotifId]=useState(null)
  axios.defaults.withCredentials=true
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
  
     function emailchange(e){
          setEmail(e.target.value)

     }
     function passwordchange(e){
          setPassword(e.target.value)

     }
     function confirmpasswordchange(e){
          setConfirmPassword(e.target.value)

     }
     function notify(message){
          setNotif(message)
          if(notifId){clearInterval(notifId)}
     let id=setTimeout(()=>{
          setNotif("")

     },1500)
     setNotifId(id)

          
 
     }
        function signup(){
          axios.post("https://productivityappbackend.onrender.com/signup",{data:{email:email,password:password,cpassword:confirmPassword}})
          .then((res)=>{
               console.log(res.data)
               if(res.data.success){
                    setEmail("")
                    setConfirmPassword("")
                    setPassword("")
               }
               notify(res.data.message)

          })
          .catch((e)=>console.log("error logging"))
          
        }
     return (
        <div id="main-cnt">
            <MainNav setAuthPage={(p)=>setAuthPage(p)} loginActive={true} signActive={false}/>
            <div id="login">
            <label className="log-label" htmlFor="email">Enter Email</label>
            <input className="log-input" onChange={e=>{emailchange(e)}} value={email} placeholder="email@email.email" type="email" id="email" name="email"/>
            <label className="log-label" htmlFor="password">Enter password</label>
            <input className="log-input" onChange={e=>{passwordchange(e)}} value={password} placeholder="********" type="password" id="password" name="password"/> 
            <label className="log-label" htmlFor="cpassword">Confirm password</label>
            <input className="log-input" onChange={e=>{confirmpasswordchange(e)}} value={confirmPassword} placeholder="********" type="password" id="cpassword" name="cpassword"/>
            <button id="signup-btn" className="login-btn" onClick={signup} >Sign Up</button> 
            
               <span id="sign-notif" ><h4>{notif}</h4></span>
        
 
            </div></div>
     )
}