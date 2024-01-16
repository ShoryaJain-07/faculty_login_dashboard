const mongoose=require("mongoose")

const FacultySchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,lowercase: true, required:true},
    password:{type:String, required:true}
})

const FacultyModel = mongoose.model("faculty",FacultySchema)
module.exports = FacultyModel