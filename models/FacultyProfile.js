const mongoose = require("mongoose")

const facultyProfileSchema = new mongoose.Schema({
    title:
    {
        type:String,
        required: true,
    },
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
    facType:{
        
        type:String,
        required: true,
    },
    section:
    {
        type:String,
        default: null,
        required: true,
    },
    phone:{
        type:Number,
        required: true,
    }
    

},{timestamps:true});

const FacultyProfile = mongoose.model("studentProfile", facultyProfileSchema);

module.exports=FacultyProfile