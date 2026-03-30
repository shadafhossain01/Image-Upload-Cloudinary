const express=require("express")
const cors=require("cors")
require("dotenv").config()

const app=express()
const PORT=process.env.PORT || 8080

app.get("/",(req,res)=>{
    
})

app.listen(PORT, ()=>console.log("Server created Successfully"))