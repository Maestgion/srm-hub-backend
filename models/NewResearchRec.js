const mongoose = require("mongoose")

const newResearchRecSchema = new mongoose.Schema({
    researchTopic:{
        type: String,
        required: true

    },
    description:{
        type: String,
        required: true
    },
    criteria:{
        type: String,
        required: true
    },
    LinkedInProfile:{
        type: String,
        required: true,
    },
    resumeUpload:{
        data: Buffer,
        type: String,
        required: true
    }
})


const NewResearchRec = mongoose.model("research", newResearchRecSchema)

module.exports = NewResearchRec