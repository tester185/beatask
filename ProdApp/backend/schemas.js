const db=require('mongoose')
let videoSchemaObject={
    link:{
        type:String,
        required:true,
        default:""
    },
    duration:{
        type:Number,
        required:true,
        default:0
    }

}
let taskObject={
    id:{
        type:String,
        required:true,
        default:""
   },
   name:{
    type:String,
    required:true,
    default:""
},
status:{
    type:Boolean,
    required:true,
    default:false
}
}
let taskSchema=new db.Schema(taskObject)
let videoSchema=new db.Schema(videoSchemaObject)
let userSchemaObject={
    email:
    {
        type:String,
        required:true,
        default:""
    },
    password:{
        type:String,
        required:true,
        default:""

    },
    tasks:
    {
        type:[taskObject],
        required:true,
        default:[]
    },
    completedTasks:
    {
        type:[taskObject],
        required:true,
        default:[]
    },
    playlist:
    {
        type:[videoSchema],
        required:true,
        default:[]
    }
}
let userSchema=new db.Schema(userSchemaObject)
module.exports={userSchema:userSchema,videoSchema:videoSchema,taskSchema:taskSchema}