const express = require("express")
const app = express()
require("../db/conn")
const PORT = process.env.PORT




app.listen(PORT, ()=>{
    console.log("server up")
})


