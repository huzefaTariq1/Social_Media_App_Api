const router=require("express").Router();
const {createUser,loginUser, logout, followAndUnfollowUsers}=require("../controller/UserController");
const auth = require("../middleware/authMiddleware");

// @route     /api/user
// @desc       creating user
// access     public

router.post("/",createUser)

// @route     /api/user/login
// @desc      getting login user token for auth 
// access     public
router.post("/login",loginUser);

// @route     /api/user/logout
// @desc      logout user
// access     public
router.get("/logout",logout)


// @route     /api/user/follow/:id
// @desc      follow and unfollow user
// access     private
router.get("/follow/:id",auth,followAndUnfollowUsers)




module.exports = router;