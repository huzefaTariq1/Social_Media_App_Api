const router=require("express").Router();
const {createUser}=require("../controller/UserController")

// @route     /api/user
// @desc       creating user
// access     public

router.get("/",createUser)

module.exports = router;