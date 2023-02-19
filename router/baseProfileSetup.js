const express = require("express")
const router = express.Router()
const StudentProfile = require("../models/StudentProfile")
const FacultyProfile = require("../models/FacultyProfile")
const ClubProfile = require("../models/ClubProfie")

router.post("/StudentProfile", async (req, res)=>{

    const {firstName, lastName, regNo, dept, section, year, phone} = req.body;

    if(!firstName || !lastName || !regNo || !dept || !section || !year || !phone) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try{

        const profile = new StudentProfile({
            firstName,
            lastName,
            regNo,
            dept,
            section,
            year,
            phone
        })

        await profile.save();

        res.status(201).json({ message: "profile completed" });
        console.log(profile);


    }catch(e)
    {
        console.log(e);
    }
})

router.post("/facultyProfile", async (req, res)=>{

    const {title, firstName, lastName, regNo, dept, section, phone} = req.body;

    if(!title||!firstName || !lastName || !regNo || !dept || !section || !phone) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try{

        const profile = new FacultyProfile({
            title,
            firstName,
            lastName,
            regNo,
            dept,
            section,
            phone, 
        })

        await profile.save();

        res.status(201).json({ message: "profile completed" });
        console.log(profile);


    }catch(e)
    {
        console.log(e);
    }
})

router.post("/clubProfile", async (req, res)=>{

    const {clubName, startingYear, clubEmai, clubType, mentorTitle, mentorName, dept, deptHod, leadName, leadRegNo, leadPhoneNo} = req.body;

    if(!clubName|| !startingYear|| !clubEmai, !clubType|| !mentorTitle|| !mentorName|| !dept|| !deptHod|| !leadName|| !leadRegNo|| !leadPhoneNo) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try{

        const profile = new ClubProfile({
            clubName, startingYear, clubEmai, clubType, mentorTitle, mentorName, dept, deptHod, leadName, leadRegNo, leadPhoneNo 
        })

        await profile.save();

        res.status(201).json({ message: "profile completed" });
        console.log(profile);


    }catch(e)
    {
        console.log(e);
    }
})








module.exports = router;