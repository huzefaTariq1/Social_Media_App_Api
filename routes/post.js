const router=require("express").Router();
const {createPost}=require("../controller/PostController")
const auth=require("../middleware/authMiddleware")

// @route     /api/user
// @desc       creating user
// access     public

router.post("/",auth,createPost)



module.exports = router;