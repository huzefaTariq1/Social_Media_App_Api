const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");


const userShema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'please enter name']
  },

  avatar: {
    public_id: {
        type: String
    },
    url: {
        type: String,
        default:"https://i.ibb.co/8cpwKjy/default-img.jpg"
    }
},

  email:{
    type:String,
    required:[true,'please enter an email'],
    unique:true,
  },

  password:{
    type:String,
    required:[true,'please enter password'],
    minlength:[5,"password must be atleast 5 character"],
    select:false
  },

  posts:[
    {
      type:mongoose.SchemaTypes.ObjectId,
      ref:'Post'
    }
  ],

  followers:[
    {
      type:mongoose.SchemaTypes.ObjectId,
      ref:'User'
    }
  ],

  following:[
    {
      type:mongoose.SchemaTypes.ObjectId,
      ref:'User'
    }
  ]

})

userShema.pre("save", async function (next) {
  if (this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10)
  }

  next()
})


module.exports = mongoose.model('User', userShema)