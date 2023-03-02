const express = require("express");
const router = express.Router();
const NewProject = require("../models/NewProject")
const NewProjectRecruitment = require("../models/NewProjectRecruitement")

const {verifyTokenAndFaculty, verifyTokenAndAuthorization} = require("../middlewares/verifyToken")


// project pitch deck 

router.post("/newProject", verifyTokenAndFaculty, async (req, res)=>{
    const { projectTitle, problemStatement, solution} = req.body;

    if(!projectTitle|| !problemStatement|| !solution)
    {
        res.status(422).json({error:"Please fill all the details"});
    } 

    try
    {

        const newProject = new NewProject({
            projectTitle, problemStatement, solution
    })

        await newProject.save();


        res.status(200).json("project added");
        console.log(newProject);


    }catch(e)
    {
        
        res.status(500).json(e)
    }
})

// project Recruitment 

router.post("/projectRecruitment", verifyTokenAndAuthorization, async (req, res)=>{
    const {projectTitle, problemStatement, criteria} = req.body;

    if(!projectTitle|| !problemStatement|| !criteria)
    {
        res.status(422).json({error:"Please fill all the details"});
    } 

    try{

        const newProjectRec = new NewProjectRecruitment({
            projectTitle, problemStatement, criteria : criteria
    })

        await newProjectRec.save();


        res.status(200).json("project recruitment posted");
        console.log(newProjectRec);

    }catch(e)
    {
        res.status(500).json(e)
    }
})


module.exports = router;