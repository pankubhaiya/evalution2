const {connection} = require("./config/db")
const {userRouter} = require("./routers/user.router")
const {blogRouter} = require("./routers/blog.router")
const {validator}=require("./midelware/midelware")
require("dotenv").config()
const mongoose = require("mongoose")
const express  = require("express")

const app = express()
app.use(express.json())

// app.use("/",(req,res)=>{
//      res.send("wlc to home page")
// })
app.use("/user",userRouter)

app.use("/blog",blogRouter)

app.listen(process.env.port,async()=>{
      try{
        await connection
        console.log("db is connect")
      }catch(err){
        console.log(err.message)
      }
      console.log(`server is running at port ${process.env.port}`)
})