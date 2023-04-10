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

module.exports = {
  createPost
}