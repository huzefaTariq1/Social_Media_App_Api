const router=require("express").Router();
const {createPost}=require("../controller/PostController")
const auth=require("../middleware/authMiddleware")

// @route     /api/user
// @desc       creating user
// access     public

router.get("/",auth,createPost)



module.exports = router;