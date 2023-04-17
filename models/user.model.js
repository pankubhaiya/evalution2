const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
     name:{type:String,required:true},
     email:{type:String,required:true},
     password:{type:String,required:true},
     role:{type:String,enum:["User","Moderator"],default:"User",required:true}
})


const tokenSchema = mongoose.Schema({
    token:{type:String,required:true}

})

const blogSchema = mongoose.Schema({
    name:{type:String,required:true},
    title:{type:String,required:true},
    book:{type:String,required:true},
})


const tokenmodel = mongoose.model("token",tokenSchema)
const usermodel = mongoose.model("user",userSchema)
const blogmodel = mongoose.model("blog",blogSchema)

module.exports = {usermodel,tokenmodel,blogmodel}