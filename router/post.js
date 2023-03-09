const express = require("express")
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken")
const Club = require("../models/ClubProfie")
const Faculty = require("../models/FacultyProfile")
const router = express.Router()
const Post = require("../models/Post")
const Student = require("../models/StudentProfile")

// post 

router.post("/create", verifyTokenAndAuthorization, async (req, res)=>{
    const {img, desc, registerLink} = req.body

    if (!img||!desc||!registerLink)
    {
        res.status(422).json({error:"Please fill all the details"});

    }

    try{

        const userId = req.rootUser.id

        const newPost = new Post({
            userId,
            img,
            desc,
            registerLink

        })

        await newPost.save()

        res.status(200).json(newPost)

    }catch(e)
    {
        
        res.status(500).json(e)
    }
} )


// update post 

router.put("/edit/:id", verifyTokenAndAuthorization, async(req, res)=>{
try{
  
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true})

    res.status(200).json(updatedPost)

}catch(e)
{
    
    res.status(500).json(e)
}

})

// delete post 


router.delete("/delete/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
       
    
       
             await Post.findByIdAndDelete(req.params.id)

        res.status(200).json("post deleted")
            

    
    }catch(e)
    {
        
        res.status(500).json(e)
    }
    
    })

// get posts

router.get("/:id", verifyTokenAndAuthorization, async (req, res)=>{

        try{   

            const posts = await Post.findbyId(req.params.id)

            if(req.params.id===posts.userId)
            {
                res.status(200).json(posts)
            }
            
        }catch(e)
        {
            
            res.status(500).json(e)
        }

    } )


// saved Post 

router.put("/saved", verifyTokenAndAuthorization, async (req, res)=>{
    
    try{    

        const user = await Post.findById(req.rootUser.id)

        const post = await Post.findbyId({userId:req.rootUser.id})



        if(user.userType==="student")
        {
            const savedPost = await Student.findByIdAndUpdate(user.id, {
                $push:{
                    savedPosts:{
                            post
                    }
                }
            })

            res.status(200).json(savedPost)
        }
        else if(user.userType==="club")
        {
            const savedPost = await Club.findByIdAndUpdate(user.id, {
                $push:{
                    savedPosts:{
                            post
                    }
                }
            })

            res.status(200).json(savedPost)
        }
        else if(user.userType==="faculty")
        {
            const savedPost = await Faculty.findByIdAndUpdate(user.id, {
                $push:{
                    savedPosts:{
                            post
                    }
                }
            })

            res.status(200).json(savedPost)
        }

    }catch(e)
    {
        
        res.status(500).json(e)
    }
})






    

module.exports = router