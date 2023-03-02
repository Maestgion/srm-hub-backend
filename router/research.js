const express = require("express")
const router = express.Router()
const NewResearchRec = require("../models/NewResearchRec")

const {verifyTokenAndFaculty} = require("../middlewares/verifyToken")

// research recruitment dierectly

router.post("/researchRec", verifyTokenAndFaculty, async(req, res)=>{

    const {researchTopic, description, criteria } = req.body;

    if(!researchTopic || !description || !criteria)
    {
        res.status(422).json({error:"Please fill all the details"});
    }

    try{

        const newResearch = new NewResearchRec({
            researchTopic, description, criteria
        })

        await newResearch.save();

        console.log(newResearch)

    }catch(e)
    {
        res.status(500).json(e)

    }

})



module.exports = router;