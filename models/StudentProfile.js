const mongoose = require("mongoose")

const studentProfileSchema = new mongoose.Schema({
    firstName:
    {
        type:String,
        required: true,
    },
    lastName:
    {
        type:String,
        required: true,
    },
    regNo:
    {
        type:Number,
        required: true,
        unique: true
    },
    dept:
    {
        type:String,
        required: true,
    },
    section:
    {
        type:String,
        required: true,
    },
    year:{
        type:String,
        required: true,
    },
    phone:{
        type:Number,
        required: true,
    }
    

},{timestamps:true});

const StudentProfile = mongoose.model("studentProfile", studentProfileSchema);

module.exports=StudentProfile