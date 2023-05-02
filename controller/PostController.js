const Post = require("../model/PostModel")
const User = require("../model/UserModel")

const createPost = async (req, res) => {

  try {
    const { caption } = req.body

    const post = await Post.create({
      caption,
      owner: req.user.id
    })

    const user = await User.findById(req.user.id)

    user.posts.push(post._id)

    await user.save()

    res.status(201).json({
      success: true,
      post
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

}


const deletePost=async(req,res)=>{
try {

   const post=await Post.findById(req.params.id)

   if (!post){
    return res.status(404).json({
      success:false,
      message:"No Post Found"
    })
   }

   if (post.owner.toString()!==req.user.id.toString()){
     return res.status(401).json({
      success:false,
      message:"UnAuthorized"
     })
   }
 
   await Post.findByIdAndDelete(req.params.id)

   // getting user
   const user=await User.findById(req.user.id)
   // removing post from user array
   const index=user.posts.indexOf(req.params.id)

   user.posts.splice(index,1)

   await user.save()

   res.status(200).json({
    success:true,
    message:"Deleted"
   })

} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  })
}
}

const likeAndUnlike=async(req,res)=>{
  try {
  
     const post=await Post.findById(req.params.id)
  
     if (!post){
      return res.status(404).json({
        success:false,
        message:"No Post Found"
      })
     }

     if (post.likes.includes(req.user.id)){
      const index=post.likes.indexOf(req.user.id);
      post.likes.splice(index,1);

      await post.save();
      return res.status(200).json({
        success:true,
        message:"Post Unliked"
      })
     }

     post.likes.push(req.user.id)

     await post.save()

     res.status(200).json({
      success:true,
      message:"Post Liked"
     })
  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
  }

  const getFollowingPosts = async (req, res) => {

    try {
   
      const user=await User.findById(req.user.id)

      

      const posts = await Post.find({
        owner: {
          $in: user.following,
        },
      }).populate("owner")

      res.status(200).json({
        success:true,
        posts:posts.reverse()
      })

    
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  
  }

module.exports = {
  createPost,
  deletePost,
  likeAndUnlike,
  getFollowingPosts
}