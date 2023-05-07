const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // check user already exist
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exist at this email",
      })
    }


    user = await User.create({
      name,
      email,
      password
    })

    res.status(201).json({
      success: true,
      data: user
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



// controller function logging in user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    // getting user from db check email registar or not
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.
        status(400)
        .json({
          success: false,
          message: "Invalid Credentials"
        });
    }


    // comaparing password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid Credentials"
        });
    }


    //creating payload
    const payload = {
      user: {
        id: user._id,
      }
    }


    // jwt signature
    const token = await JWT.sign(
      payload,
      process.env.SECRECT_TOKEN,
    )

    res.status(200).cookie("token", token, { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true }).json({
      success:true,
      token,
      user
    })


  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



const followAndUnFollow=async(req,res)=>{
  try {

    const userToFollow=await User.findById(req.params.id);
    const currentUser=await User.findById(req.user.id);

    
    if (currentUser.following.includes(req.params.id)){
      console.log("undollow")
      const userToFollowIndex=currentUser.following.indexOf(req.params.id);
      const currentUserIndex=userToFollow.followers.indexOf(req.user.id);

      currentUser.following.splice(userToFollowIndex,1);
      userToFollow.followers.splice(currentUserIndex,1);

      await userToFollow.save();
      await currentUser.save();

      return res.status(200).json({
        success:true,
        message:"UnFollow User"
      })

    }

  
    currentUser.following.push(req.params.id);
    userToFollow.followers.push(req.user.id);
    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      success:true,
      message:"Follow User"
    })
  
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


const logOut=async(req,res)=>{
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


const changePassword=async(req,res)=>{
  try {
   
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const user = await User.findById(req.user.id).select("+password");

       // comaparing password
       const isMatch = await bcrypt.compare(oldPassword, user.password);
       if (!isMatch) {
        console.log(isMatch)
         return res
           .status(400)
           .json({
             success: false,
             message: "Old password is InCorrect"
           });
       }

       user.password = newPassword;
       await user.save();
   
       res.status(200).json({
         success: true,
         message: "Password Updated",
       });
    

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = {
  createUser,
  loginUser,
  followAndUnFollow,
  logOut,
  changePassword
}