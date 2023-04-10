const router=require("express").Router();
const {createPost,likeAndDislike}=require("../controller/PostController")
const auth=require("../middleware/authMiddleware")

// @route     /api/post
// @desc       creating psot
// access     private

router.post("/",auth,createPost)

// @route     /api/post/:id
// @desc       like and dislike post
// access      private

router.get("/:id",auth,likeAndDislike)



module.exports = router;