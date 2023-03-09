const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const studentSchema = new mongoose.Schema({
    userType:{
        type: String,
        required: true,
    },
    email:
    {
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    cnfPassword:{
        type:String,
        required: true
    },
    isHod:{
        type: Boolean,
        default: false,
    },
    firstName:
    {
        type: String,
        required: true,
    },
    lastName:
    {
        type: String,
        required: true,
    },
    regNo:
    {
        type: String,
        required: true,
        unique: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    dept:
    {
        type: String,
        required: true,
    },
    section:
    {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    achievements: [
        {
            competitionName: {
                type: String,
                required: true,
            },
            position: {
                type: String,
                required: true
            },
            proofLink: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            }

        }
    ],
    savedPosts: {
        type: Array,
        default: []
    },
    tokens:
    [
     {
         token:{
             type: String,
             required: true
         }
     }
    ],



}, { timestamps: true });


studentSchema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password, 10)
        this.cnfPassword = await bcrypt.hash(this.cnfPassword, 10)

    }
    next()
})

studentSchema.methods.generateToken = async function()
{
    try{
        let generatedToken = jwt.sign({_id: this._id, }, process.env.SECRET_KEY)

        this.tokens = this.tokens.concat({token:generatedToken})
        await this.save()
        return generatedToken;
    }catch(e)
    {
    console.log(e);

    }
}

const Student = mongoose.model("student", studentSchema);

module.exports = Student