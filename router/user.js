const express = require("express");
const { verifyTokenAndAuthorization, verifyTokenAndHod, verifyTokenAndFaculty } = require("../middlewares/verifyToken");
const router  = express.Router()
const bcrypt = require("bcryptjs");
const User = require("../models/User")
const Student = require("../models/StudentProfile")
const Faculty = require("../models/FacultyProfile")
const Club = require("../models/ClubProfie")

// update Account 

router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    if(req.body.password)
    {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    try{
        const updatedAccount = await User.findByIdAndUpdate(req.params.id,
            {
                $set : req.body
            }, {new:true})
        
            res.status(200).json(updatedAccount)

        const user = await User.findById(req.params.id)

        if(user.userType=== "student")
        {
            try{
                const updatedAccount = await Student.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new:true})
            res.status(200).json(updatedAccount)

            }catch(e)
            {
                console.error(e);
                res.status(500).json({error:"error"})
            }
        }
        else if(user.userType === "faculty")
        {
            try{
                const updatedAccount = await Faculty.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new:true})
            res.status(200).json(updatedAccount)

            }catch(e)
            {
                console.error(e);
                res.status(500).json({error:"error"})
            }
        }
        else if(user.userType === "club")
        {
            try{
                const updatedAccount = await Club.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new:true})
            res.status(200).json(updatedAccount)

            }catch(e)
            {
                console.error(e);
                res.status(500).json({error:"error"})
            }
        }
            


    }catch(e)
    {
        console.error(e);
        res.status(500).json({error:"error"})
    }
})

// get all students

router.get("/students", verifyTokenAndHod, async (req, res)=>{
    try{
        const students = await Student.find({isHod:false})

        res.status(200).json(students);
    }
    catch(e)
    {
        console.error(e);
        res.status(500).json({error:"error"})
    }
})


// get specific students

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


// get all faculties

router.get("/faculties", verifyTokenAndHod, async (req, res)=>{
    try{
        const students = await Faculty.find({isHod:false})

        res.status(200).json(students);
    }
    catch(e)
    {
        console.error(e);
        res.status(500).json({error:"error"})
    }
})

// get all Clubs


router.get("/clubs", verifyTokenAndHod, async (req, res)=>{
    try{
        const students = await Faculty.find({isHod:false})

        res.status(200).json(students);
    }
    catch(e)
    {
        console.error(e);
        res.status(500).json({error:"error"})
    }
})







module.exports = router;