const mongoose = require("mongoose")

const facultyProfileSchema = mongoose.Schema({
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
    section:
    {
        type:String,
        required: true,
    },
    phone:{
        type:Number,
        required: true,
    }
    

},{timestamps:true});

const FacultyProfile = mongoose.model("studentProfile", facultyProfileSchema);

module.exports=FacultyProfile