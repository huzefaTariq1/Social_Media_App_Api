const router=require("express").Router();
const {createUser,loginUser}=require("../controller/UserController")

// @route     /api/user
// @desc       creating user
// access     public

router.post("/",createUser)

// @route     /api/user/login
// @desc      getting login user token for auth 
// access     public
router.post("/login",loginUser);


module.exports = router;