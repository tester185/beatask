require('dotenv').config();
const express=require('express')
const bd=require('body-parser')
const app=express()
const cors=require('cors')
const request=require('request')
const axios=require('axios')
const session=require('express-session')
const db=require('mongoose')
const nocache = require('nocache');
const bc=require('bcrypt')
const helmet = require('helmet');
const http = require('http');
const jwt=require('jsonwebtoken')

const {userSchema,videoSchema}=require('./schemas.js')
const dataBaseKey=process.env.LINK
const {parseLink:parseLink,cleanDuration:cleanDuration,errorCheck:errorCheck,getDuration:getDuration}=require('./usefull.js')
db.connect("mongodb+srv://anas:123@cluster0.xbj37rr.mongodb.net/?")
.then(()=>console.log('connected'))
.catch(()=>console.log("database error"))

  
const corsOptions = {
    origin: 'https://beatask.onrender.com', // Replace with your frontend's origin
    credentials: true, // If you're sending cookies or authorization headers
    allowedHeaders: ['Content-Type', 'Authorization','x-powered-by'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Adjust allowed methods if needed
  };

let prodUsersModel=new db.model('prodUsers',userSchema)
let prodVideosModel=new db.model('prodVideo',videoSchema)


app.use(helmet())



  
  app.use(cors(corsOptions));
app.use(bd.urlencoded({ extended: true }));
app.use(bd.json());

app.use((req,res,next)=>{
    console.log(req.method+" "+req.url)
    next()
})
app.listen(3000,(e)=>{if(!e)console.log("listening on port 3000");else console.log("error on port 3000")})
let tasks=[{id:"azdazd",status:false,name:"do this"},{id:"azdaszd",status:false,name:"do this"},{id:"azdassszd",status:false,name:"do this"}]
let videos=[]

function verify(req){
    const head=req.headers.authorization;
    const token=head;
    if(token){
        //token exists
        try{
        const ver=jwt.verify(token,process.env.JWT)
        req.user=ver.user
        return 1
        
        }
        catch(e){
            console.log("error verifying token "+e.message)
            return -1
        }
    
    }
    return 0
    }
    
app.get('/getauth',(req,res)=>{
    verify(req)
    res.json({message:"done",auth:!!req.user})
})

app.post('/addtask',async(req,res)=>{
    verify(req)

    if(req.user){
    let task=req.body.data.task
    /****************** */
    //add task
   await prodUsersModel.findOneAndUpdate({email:req.user},{$push:{tasks:task}})

    /****************** */
    console.log("task added")
    res.json({message:"tasks added"})

    }
    else 
    res.json({message:"error"})
})
app.post("/updatetask",async(req,res)=>{
    verify(req)
    if(req.user){
    let id=req.body.data.taskid
    let user=await prodUsersModel.findOne({email:req.user})
    let tasks=await user.tasks
let updatedtasks = tasks.map((task) => {
    console.log("task " + task);
    if (task.id == id) {
        const updatedTask = JSON.parse(JSON.stringify(task));
        updatedTask.status =!updatedTask.status;
        return updatedTask; 
    } else {
        return {...task };
    }
});
    await prodUsersModel.findOneAndUpdate({email:req.user},{tasks:updatedtasks})

    console.log("tasks updated")
    res.json({message:"tasks updated"})

    }
    else res.json({message:"error"})
})
app.get('/task',async(req,res)=>{
    verify(req)
    if(req.user){
        let user=await prodUsersModel.findOne({email:req.user})
        let tasks=user.tasks;

    res.json({tasks:tasks})

    }
    else{
        res.json({message:"error",tasks:[]})

    }
    
})
app.get('/completedTasks',async(req,res)=>{
    verify(req)
    if(req.user){
        let user=await prodUsersModel.findOne({email:req.user})
        let tasks=user.completedTasks
 
    res.json({tasks:tasks,message:"done"})

    }
    else{
        res.json({message:"error",tasks:[]})

    }
    
})
app.post('/cleartask',async(req,res)=>{
    verify(req)

    try{
    if(req.user){
        console.log('tasks cleared')
         const id=await req.body.taskid
         
         let user=(await prodUsersModel.findOne({email:req.user}))
         let prevcompleted=user.completedTasks
         let tasks=await user.tasks
         let newtasks=tasks.filter((task)=>{
            return !task.status
         })
         let completedtasks=tasks.filter((task)=>{
            return task.status
         })
         console.log(newtasks)
         console.log(completedtasks)
         console.log(prevcompleted)
         await prodUsersModel.findOneAndUpdate({email:req.user},{tasks:newtasks,completedTasks:[... completedtasks,...prevcompleted]})
        res.json({message:"done"})
    }
    else   res.json({message:"error"})
    }
    catch(e){
        console.log("error removing task "+e.message)
    }
})
app.delete('/task',async(req,res)=>{
verify(req)
try{
if(req.user){
     const id=await req.body.taskid
     
     let tasks=(await prodUsersModel.findOne({email:req.user}))
     tasks=await tasks.tasks
     tasks=tasks.filter((task)=>{
        return task.id!=id
     })
     await prodUsersModel.findOneAndUpdate({email:req.user},{tasks:tasks})
    res.json({message:"done"})
}
else   res.json({message:"error"})
}
catch(e){
    console.log("error removing task "+e.message)
}
    
})
app.get('/getvideos',async(req,res)=>{
    verify(req)
    if(req.user){
        try{
            let user =await prodUsersModel.findOne({email:req.user})
            let playlist =user.playlist
            console.log(playlist)
            res.json({message:"done",videos:playlist})

        }
        catch(e){
            console.log("error getting videos "+e.message+" "+e.stack)
            res.json({message:"error"})
        }

    }
    else{
        console.log(req.user+" user")
        res.json({message:"error"})
    }
})
app.post('/addvideo',async(req,res)=>{
    verify(req)
    try{

    
    if(req.user){
    let link=req.body.data.link
    let exists=false;
    if(link && link.length){
        //checking if link exists
         request.get(link,async(e)=>{
            if(!e){
            let linker=parseLink(link)
            let duration=await getDuration(linker)
            duration=await cleanDuration(duration)
            console.log(link)
            console.log(linker)
            let video={link:linker,duration:duration}
            await prodUsersModel.findOneAndUpdate({email:req.user},{$push:{playlist:video}})
            res.json({message:"done",video:video})
            }
            else res.json({message:"error"})
        })
    }

    }
    else{
        res.json({message:"error"})

    }}
    catch(e){
        console.log('error adding video '+e.message+" "+e.stack)
        res.json({message:"error"})
    }
})
app.delete("/deletevideo",async(req,res)=>{
    verify(req.res)
    try{
    if(req.user){
    let id=req.body.id
    let user = await prodUsersModel.findOne({email:req.user})
    let videos=await user.playlist
        videos=videos.filter((video)=>{
            return video.link!=id
        })
        await prodUsersModel.findOneAndUpdate({email:req.user},{playlist:videos})
    res.json({message:"done"})
    

    }
    else{
        res.json({message:"error"})

    }

    }
    catch(e){
        console.log('error removing video '+e.message+" "+e.stack)
        res.json({message:"error"})
    }
})
app.post('/signup',async(req,res)=>{
    verify(req)
if(!req.user){
    console.log(req.header)
    let email=req.body.data.email
    let password=req.body.data.password
    let cpassword=req.body.data.cpassword
  if(errorCheck([email,password,cpassword])){
    let user=await prodUsersModel.findOne({email:email})
    if(!user){

        if(password==cpassword){
            try{
            /******************** */
            let encpass=await bc.hash(password,10)
            await prodUsersModel.create({
                email:email,
                password:encpass,
                tasks:[],
                completedTasks:[],
                playlist:[]
            })
            /******************** */
            console.log("new user added")
            console.log(user)
            res.json({message:"Go login",success:true})
            }
            catch(e){
                console.log("error adding user "+e.message)
                res.json({message:"error signing up",success:false})
            }


        }
        else{
            res.json({message:"Password mismatch",success:false})

        }

    }
    else{
        //email exists
        res.json({message:"Account Exists",success:false})
    }

  }
  else{
    res.json({message:"Error from input",success:false})

  }

}
else{
    res.json({message:"Error",success:false})
}

})




app.post('/test',async(req,res)=>{
   let state=await verify(req);
   if(state){
    if(state==1){
        //well auth

    }
    else{
        //expired
    }

   }
   else{
    return res.json({message:"not auth"})
   }
})

app.post('/login',async(req,res)=>{
   await verify(req);
   console.log("headers")

    try{
if(!req.user){
    let email=req.body.data.email
    let password=req.body.data.password
    
  if(errorCheck([email,password])){
    let user=await prodUsersModel.findOne({email:email})
    if(user ){
        let auth=await bc.compare(password,user.password)
        if(auth){
            const token=jwt.sign({user:email},process.env.JWT,{expiresIn:"30d"});
            
        req.user=await email
        
        res.json({message:"done",success:true ,token:token})


    }
        else{
            res.json({message:"Wrong Password \n try again",success:false})

        }
        
    }
    else{
        //email dosent exists
        res.json({message:"Account Dosent Exists Exists \n proceed to create a New One",success:false})
    }

  }
  else{
    res.json({message:"Error from input",success:false})

  }


}
else{
    res.json({message:"Error",success:false})
}

}
catch(e){
    console.log('error logging in '+e.message)
    res.json({message:"error logging in",success:false})

}
})
app.post('/logout',async(req,res)=>{
    
    verify(req)
    if(req.user){
        req.user=null
        res.json({message:"done"})

    }
    else{
        res.json({message:"error"})
    }
})

function test(){
}
test()