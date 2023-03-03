const express = require("express");
const router = express.Router();
const NewProject = require("../models/NewProject")
const NewProjectRec = require("../models/NewProjectRecruitement")
const Applications = require("../models/Applications")
const {verifyTokenAndFaculty, verifyTokenAndAuthorization, verifyTokenAndHod} = require("../middlewares/verifyToken")


// post project pitch-deck (faculty) 

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


// get project pitch-deck (hod) 

router.get("/newProject/pitch", verifyTokenAndFaculty, async (req, res)=>{
    projectDetails = await NewProject.find();

    res.status(200).json(projectDetails)
})



// project Recruitment 

router.post("/newProject/recruitment", verifyTokenAndAuthorization, async (req, res)=>{
    const {projectTitle, problemStatement, criteria} = req.body;

    if(!projectTitle|| !problemStatement|| !criteria)
    {
        res.status(422).json({error:"Please fill all the details"});
    } 

    try{

        const newProjectRec = new NewProjectRec({
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


//  get project recruitment details (student)


router.get("/newProject/recDetails", async (req, res)=>{
    try{
        projectRecDetails = await NewProjectRec.find();

    res.status(200).json(projectRecDetails)
    }catch(e)
    {
        res.status(500).json(e)
    }
})


// post project update

router.post("/newProject/approval/:id", verifyTokenAndHod, async (req, res)=>{
    
    const {status, comments} = req.body;

    if(!status || !comments) 
    {
        res.status(422).json({error:"Please fill all the details"});
        
    }

    try{
        const projectStatus = await NewProject.findByIdAndUpdate(req.params.id, {
            $set:{
                update:[
                    {
                        status,
                        comments,
                    }
                ]
            }
        })

        res.status(200).json(projectStatus)
    }catch(e)
    {
        res.status(500).json(e)
    }
})

// get project status

router.get("/newProject/status/:id", verifyTokenAndFaculty, async (req, res)=>{
    


    try{
        const project = await NewProject.findById(req.params.id)

        const projectUpdate = project.update 

        res.status(200).json(projectUpdate)
    }catch(e)
    {
        res.status(500).json(e)
    }
})




module.exports = router;