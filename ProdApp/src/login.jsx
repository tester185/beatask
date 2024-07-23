import "./login.css"
import { useState } from "react"
import axios from "axios"
import MainNav from './MainNav.jsx'
export default function Login(props){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const setAuth=props.setAuth
  const setAuthPage=props.setAuthPage
  const [notif,setNotif]=useState("")
  const [notifId,setNotifId]=useState(null)
  axios.defaults.withCredentials=true
  axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
     function emailchange(e){
          setEmail(e.target.value)

     }
     function passwordchange(e){
          setPassword(e.target.value)

     }
     function notify(message){
          setNotif(message)
          if(notifId){clearInterval(notifId)}
     let id=setTimeout(()=>{
          setNotif("")

     },1500)
     setNotifId(id)

          
 
     }
        function login(){
          axios.post("https://productivityappbackend-586f.onrender.com/login",{data:{email:email,password:password}})
          .then((res)=>{
               console.log(res.data)
               console.log(localStorage.getItem('token'))
               if(res.data.success){
                    console.log("logged")
                    setAuth(true)
                  localStorage.setItem('token',res.data.token)
                  console.log(localStorage.getItem('token'))
                  
               }
                    notify(res.data.message)
               

          })
          .catch((e)=>console.log("error logging "+e.message+" "+e.stack))
          
        }
     return (
        <div id="main-cnt">
            <MainNav setAuthPage={(p)=>setAuthPage(p)} loginActive={false} signActive={true}/>
            <div id="login">
            <label className="log-label" htmlFor="email">Enter Email</label>
            <input className="log-input" onChange={e=>{emailchange(e)}} value={email} placeholder="email@email.email" type="email" id="email" name="email"/>
            <label className="log-label" htmlFor="password">Enter password</label>
            
            <input className="log-input" onChange={e=>{passwordchange(e)}} value={password} placeholder="********" type="password" id="password" name="password"/>
            <button className="login-btn" onClick={login} >Login</button>
             <span id="sign-notif" ><h4>{notif}</h4></span>
        
 
            </div></div>
     )
}