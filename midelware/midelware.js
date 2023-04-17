const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { usermodel, tokenmodel } = require("../model/model");

const validator = (req, res, next) => {

  
  let  token = req.headers.authorization.split(" ")[1];
  if(!token){
      res.send("login first")
  }else{
    jwt.verify(token, process.env.refresh_key, (err, decoded) => {
        if (err) {
          res.send("your token is not valid plese login first");
        } else {
      
          req.body.role=decoded.role
          next();
        }
      });
  }
 
};


const authorization = (parmitedrole)=>{
     return (req,res,next)=>{
            
          if(parmitedrole.includes(req.body.role)){
            next()
          }else{
           return res.send("you are not authrozed")
          }
     }
}


module.exports = { validator,authorization};
