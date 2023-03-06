const mongoose = require("mongoose")


const clubSchema = new mongoose.Schema({
    clubName:
    {
        type:String,
        required: true,
    },
    startingYear:
    {
        type:Number,
        required: true,
    },
    clubEmail:
    {
        type:Number,
        required: true,
        unique: true
    },
    clubType:{
        
        type:String,
        required: true,
    },
    mentorTitle:
    {
        type:String,
        required: true,
    },
    mentorName:
    {
        type:String,
        required: true,
    },
    dept:
    {
        type:String,
        required: true,
    },
    deptHod:
    {
        type:String,
        required: true,
    },
    leadName:
    {
        type:String,
        required: true,
    },
    leadRegNo:{
        type:String,
        required: true,
    },
    leadPhoneNo:{
        type:Number,
        required: true,
    }
    

})


const Club = mongoose.model("club", clubSchema)

module.exports = Club;

