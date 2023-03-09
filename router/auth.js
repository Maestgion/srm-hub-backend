const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const Student = require("../models/StudentProfile")
const Faculty = require("../models/FacultyProfile")
const Club = require("../models/ClubProfie")

router.post("/register", async (req, res) => {
    const { userType, email, password, cnfPassword } = req.body;

    if (!userType || !email || !password || !cnfPassword) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {

        if (userType === "student") {
            const userExists = await Student.findOne({ email });

            if (userExists) {
                res.status(422).json({ message: "User already exists" });
            }
            else if (password != cnfPassword) {
                res.status(422).json({ message: "Please write the same passwords" });
            }
            else {
                const newUser = new Student({
                    userType,
                    email,
                    password,
                    cnfPassword
                });

                try {
                    const createUser = await newUser.save();

                    res.status(201).json({ message: "user registered successfully" });
                    console.log(createUser);

                } catch (e) {
                    res.status(500).json({ error: "Internal server error", e });
                }
            }

        }
        else if (userType === "faculty") {
            const userExists = await Faculty.findOne({ email });

            if (userExists) {
                res.status(422).json({ message: "User already exists" });
            }
            else if (password != cnfPassword) {
                res.status(422).json({ message: "Please write the same passwords" });
            }
            else {
                const newUser = new Faculty({
                    userType,
                    email,
                    password,
                    cnfPassword
                });

                try {
                    const createUser = await newUser.save();

                    res.status(201).json({ message: "user registered successfully" });
                    console.log(createUser);

                } catch (e) {
                    console.log(e)
                    res.status(500).json({ error: "Internal server error", e });
                }
            }
        }
        else if (userType === "club") {
            const userExists = await Club.findOne({ email });

            if (userExists) {
                res.status(422).json({ message: "User already exists" });
            }
            else if (password != cnfPassword) {
                res.status(422).json({ message: "Please write the same passwords" });
            }
            else {
                const newUser = new Club({
                    userType,
                    email,
                    password,
                    cnfPassword
                });

                try {
                    const createUser = await newUser.save();

                    res.status(201).json({ message: "user registered successfully" });
                    console.log(createUser);

                } catch (e) {
                    res.status(500).json({ error: "Internal server error", e });
                }
            }
        }

    } catch (e) {
        console.log(e);
    }
})

router.post("/login", async (req, res) => {

    const { userType, email, password } = req.body

    if (!userType || !email || !password) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    if (userType === "student") {
        try {

            const userExists = await Student.findOne({ email })

            const passwordMatch = bcrypt.compare(password, userExists.password)

            if (!passwordMatch) {
                res.status(401).json({ error: "Wrong credentials!" })

            }
            else {
                const token = await userExists.generateToken()
                console.log(token)
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2592000000),
                    httpOnly: true
                })

                const { password, cnfPassword, ...others } = userExists._doc
                res.status(201).json({ message: "login successful", others, uid: userExists._id })
                console.log("user---- id", userExists._id)
            }
        } catch (e) {
            console.log(e)
        }
    }
    else if (userType === "faculty") {
        try {

            const userExists = await Faculty.findOne({ email })

            const passwordMatch = bcrypt.compare(password, userExists.password)

            if (!passwordMatch) {
                res.status(401).json({ error: "Wrong credentials!" })

            }
            else {
                const token = await userExists.generateToken()
                console.log(token)
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2592000000),
                    httpOnly: true
                })

                const { password, cnfPassword, ...others } = userExists._doc
                res.status(201).json({ message: "login successful", others, uid: userExists._id })
                console.log(userExists)
            }
        } catch (e) {
            console.log(e)
        }
    }
    else if (userType === "club") {
        try {

            const userExists = await Club.findOne({ email })

            const passwordMatch = bcrypt.compare(password, userExists.password)

            if (!passwordMatch) {
                res.status(401).json({ error: "Wrong credentials!" })

            }
            else {
                const token = await userExists.generateToken()
                console.log(token)
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2592000000),
                    httpOnly: true
                })

                const { password, cnfPassword, ...others } = userExists._doc
                res.status(201).json({ message: "login successful", others, uid: userExists._id })
                console.log("user---- id", userExists._id)
            }
        } catch (e) {
            console.log(e)
        }
    }

})





module.exports = router;

