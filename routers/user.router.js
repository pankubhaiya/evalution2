const mongoose = require("mongoose")
require("dotenv").config()
const {usermodel,tokenmodel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express= require("express")
const userRouter = express.Router()
userRouter.use(express.json())


userRouter.post("/sign",async(req,res)=>{
      
    try{
          const {name,email,password,role}=req.body

           let user = await usermodel.findOne({email})
           if(user){
                res.send("user already present")
           }else{
                req.body.password = bcrypt.hashSync(password,5)
                let newuser = new usermodel(req.body)
                await newuser.save()
                res.send("sign in succesfull")
           }
    }catch(err){
        res.send({mes:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
      
    try{
          const {name,email,password,role}=req.body

           let user = await usermodel.findOne({email})
           if(!user){
                res.send("user is not found")
           }else{
               let nuser = await bcrypt.compare(password,user.password)
                
               if(nuser){
                    let token = jwt.sign({id:user._id,role:user.role},process.env.token_key,{expiresIn:"1m"})
                    let ref_token =  jwt.sign({id:user._id,role:user.role},process.env.refresh_key,{expiresIn:"3m"})
                    res.send({"token":token,"ref_token":ref_token})

               }else{
                res.send("wrong password")
               }
                
           }
    }catch(err){
        res.send({mes:err.message})
    }
})



userRouter.post("/logout",async(req,res)=>{
      
    try{
         let token = req.headers.authorization.split(" ")[1]
         if(token){
            let blacklisttoken = new tokenmodel({token})
            await blacklisttoken.save()  
            res.send("logout sccessfull")
          }

    }catch(err){
        res.send({mes:err.message})
    }
})

userRouter.post("/refresh",async(req,res)=>{
      
    try{
         let token = req.headers.authorization.split(" ")[1]       
         if(await tokenmodel.findOne({token})){
              res.send("you are in block list please login first")
         }else{
            let ntoken = jwt.sign({role:req.body.role,email:req.body.email},process.env.token_key,{expiresIn:"1m"})
            res.send({token:ntoken})
         }
      

    }catch(err){
        res.send({mes:err.message})
    }
})





module.exports={userRouter}