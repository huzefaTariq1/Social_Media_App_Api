const router=require("express").Router();
const {createUser,
    loginUser, 
    followAndUnFollow,
    logOut,
    changePassword,
    getMe,
    getUserProfile}=require("../controller/UserController");
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
// @desc      logout  
// access     public
router.get("/logout",logOut)

// @route     /api/user/getme
// @desc      getting all details of current login user  
// access     private
router.get("/getme",auth,getMe)

// @route     /api/user/update/password
// @desc      change password 
// access     private
router.put("/update/password",auth,changePassword)

// @route     /api/user/follow/:id
// @desc      follow And unfollow users
// access     private
router.get("/follow/:id",auth,followAndUnFollow);

// @route     /api/user/getuser/:id
// @desc      getting data of user's profile
// access     private
router.get("/getuser/:id",auth,getUserProfile)


module.exports = router;