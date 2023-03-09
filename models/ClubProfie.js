const mongoose = require("mongoose")


const clubSchema = new mongoose.Schema({
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
    clubName:
    {
        type: String,
        required: true,
    },
    startingYear:
    {
        type: Date,
        required: true,
    },
    clubType: {

        type: String,
        required: true,
    },
    mentorTitle:
    {
        type: String,
        required: true,
    },
    mentorName:
    {
        type: String,
        required: true,
    },
    dept:
    {
        type: String,
        required: true,
    },
    deptHod:
    {
        type: String,
        required: true,
    },
    leadName:
    {
        type: String,
        required: true,
    },
    leadRegNo: {
        type: String,
        required: true,
    },
    leadPhoneNo: {
        type: Number,
        required: true,
    },
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
    ]



})

clubSchema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password, 10)
        this.cnfPassword = await bcrypt.hash(this.cnfPassword, 10)

    }
    next()
})

clubSchema.methods.generateToken = async function()
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


const Club = mongoose.model("club", clubSchema)

module.exports = Club;

