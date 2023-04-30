const router=require("express").Router();
const {createPost, deletePost, likeAndUnlike}=require("../controller/PostController")
const auth=require("../middleware/authMiddleware")

// @route     /api/post
// @desc       creating post
// access     private

router.post("/",auth,createPost)

// @route     /api/post/:id
// @desc      deleting post
// access     private

router.delete("/:id",auth,deletePost)

// @route     /api/post/:id
// @desc      like and unlike
// access     get

router.get("/:id",auth,likeAndUnlike)



module.exports = router;