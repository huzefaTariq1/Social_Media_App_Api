const router=require("express").Router();
const {createUser,
    loginUser, 
    followAndUnFollow,
    logOut,
    changePassword}=require("../controller/UserController");
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

router.put("/update/password",auth,changePassword)

// @route     /api/user/follow/:id
// @desc      follow And unfollow users
// access     private
router.get("/follow/:id",auth,followAndUnFollow);


module.exports = router;