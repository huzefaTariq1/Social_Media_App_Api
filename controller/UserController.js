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

//logout method 
const logout=async(req,res)=>{
  try {
    res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true})
    .json({
      success:true,
      message:"logged out"
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


// follow and unfollow user,
const followAndUnfollowUsers=async(req,res)=>{
try {
  const userToFollow = await User.findById(req.params.id)
  const currentUser = await User.findById(req.user._id)

  

  if (!userToFollow) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (currentUser.following.includes(userToFollow._id)) {
    const indexfollowing = currentUser.following.indexOf(userToFollow._id);
    const indexfollowers = userToFollow.followers.indexOf(currentUser._id);

    currentUser.following.splice(indexfollowing, 1);
    userToFollow.followers.splice(indexfollowers, 1);

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: "User Unfollowed",
    });
  } else {
    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: "User followed",
    });
  }
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
  logout,
  followAndUnfollowUsers
}