const express = require("express")
const router = express.Router()
const { verifyTokenAndAuthorization, verifyTokenAndHod, verifyTokenAndFaculty } = require("../middlewares/verifyToken");

const Student = require("../models/StudentProfile")

const Faculty = require("../models/FacultyProfile")


// post achievements

router.post("/:id/achievements", verifyTokenAndAuthorization, async(req, res)=>{

    const {competitionName, position, proofLink, date} = req.body;

    if(!competitionName || !position || !proofLink || !date)
    {
        res.status(422).json({error: "Please fill all the details"})
    }

    try{
        const studentAchievements = await Student.findByIdAndUpdate(req.params.id, {
            $set : {
                
                achievements:[
                    {
                        competitionName,
                        position,
                        proofLink,
                        date
                    }
                ]
            }
        })

        res.status(200).json(studentAchievements)
    }catch(e)
    {
        res.status(500).json(e)
    }

})


// get section students

router.get("/faculty/:id", verifyTokenAndFaculty, async (req, res)=>{
    try{
        const faculty = await Faculty.findById(req.params.id)
        const students = await Student.find({section:faculty.section})

        if(faculty.section===students.section){
            
            const orderedStudents = await Student.aggregate([
                {
                    $project:{
                        firstName: 1,
                        lastName: 1,
                        regNoSorted:{
                            $substr:["$regNo", 11, -1]
                        } ,
                        dept:1,
                        section:1,
                        year:1,
                        phone:1,
                        achievements,
                    }
                }
            ]).sort({regNoSorted:1})


            res.status(200).json(orderedStudents);
        }

    } catch(e)
    {
        console.error(e);
        res.status(500).json({error:"error"})
    }
})







module.exports = router;