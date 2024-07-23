import { Fragment, useEffect,useLayoutEffect, useState } from "react";
import App from './App.jsx'
import Login from './login.jsx'
import Sign from './signup.jsx'
import Home from './Home.jsx'
import Test from './test.jsx'
import axios from 'axios'
import Loading from "./Loading.jsx";
export default function MainApp(){
    const [auth,setAuth]=useState(false);
    const [sign,setSign]=useState(false); 
    const [authPage,setAuthPage]=useState(-1);
    axios.defaults.withCredentials=true
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    useLayoutEffect(()=>{
        axios.get('https://productivityappbackend-586f.onrender.com/getAuth')
        .then((res)=>{
            if(res.data.message!="error"){
                setAuth(res.data.auth)
                if(!res.data.auth)
                    setAuthPage(0)
 
            }
            else
            console.log("error")
        })
        .catch((e)=>{
            console.log("error "+e.message)
        })
    },[auth])
    console.log(authPage)
    console.log("authPage")
   return  (
    <Fragment>
        {auth?<App setAuth={()=>setAuth()}/>:
        authPage==-1?<Loading/>:authPage==0?<Home setAuthPage={(p)=>setAuthPage(p)} /> :authPage==2?<Sign  setAuthPage={(p)=>setAuthPage(p)}/>:<Login setAuth={(p)=>setAuth(p)} setAuthPage={(p)=>setAuthPage(p)}/>}
    </Fragment>
   )
}