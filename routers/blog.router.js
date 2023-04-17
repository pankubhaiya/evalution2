const mongoose = require("mongoose")
require("dotenv").config()
const {usermodel,blogmodel} = require("../models/user.model")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express= require("express")
const { authorization } = require("../midelware/midelware")
const blogRouter = express.Router()
blogRouter.use(express.json())



 
//create a new post
blogRouter.post("/add",async(req,res)=>{
   try {
    const {title,book,name}=req.body

    const newblog= new blogmodel(req.body)
    await newblog.save()
     res.send("add successfully")
   } catch (error) {
      res.send({msg:error.message})
   }
    
})


blogRouter.get("/all",async(req,res)=>{

    try {
        const {title,book,name}=req.body
        const allblogs= await blogmodel.find()
         res.send(allblogs )
       } catch (error) {
          res.send({msg:error.message})
       }
})




blogRouter.patch("/update/:id",async(req,res)=>{
    
    try {
        const updated= await blogmodel.findByIdAndUpdate({_id:req.params.id},req.body)
         res.send(" updated successfully")
    } catch (error) {
        res.send({msg:error.message})
    }
})





blogRouter.delete("/delete/:id",authorization(["moderator"]),async(req,res)=>{
   try {
    const deleted= await blogmodel.findByIdAndDelete({_id:req.params.id},req.body)

    res.send("deleted succesfully")
   } catch (error) {
    res.send({msg:error.message})
   }
})


module.exports= {blogRouter}