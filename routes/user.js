const router=require("express").Router();
const {createUser,
    loginUser, 
    followAndUnFollow,
    logOut}=require("../controller/UserController");
const auth = require("../middleware/authMiddleware");

// @route     /api/user
// @desc       creating user
// access     public

router.post("/",createUser)

// @route     /api/user/login
// @desc      getting login user token for auth 
// access     public
router.post("/login",loginUser);

// @route     /api/user/login
// @desc      getting login user token for auth 
// access     public
router.get("/logout",logOut)

// @route     /api/user/follow/:id
// @desc      follow And unfollow users
// access     private
router.get("/follow/:id",auth,followAndUnFollow);


module.exports = router;