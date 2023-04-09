const createPost=async(req,res)=>{
    console.log(req.user)
    res.status(200).json("works")
}

module.exports={
    createPost
}