const express=require('express')
const app=express()
const port=4000
const mongoose=require('mongoose')
const routes=require('./routes/index')
const cors=require('cors')
app.set('trust proxy', true)
app.use(express.json());
app.use(cors())
app.use(routes)

mongoose.connect('mongodb+srv://rahulkainswal:1t99cEBnjoCsVeXr@cluster0.bxeffe9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((res)=>{
    console.log("mongodb connected successfully ");
app.listen(port,()=>{console.log("server started");
})

    
}).catch((e)=>{
    console.log(e);
    
})

