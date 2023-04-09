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


module.exports = {
  createUser,
  loginUser
}