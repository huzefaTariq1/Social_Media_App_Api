const express=require("express");
const mongoose=require("mongoose");
const userRoute=require("./routes/user");
const dotenv=require("dotenv").config();

// Connect DB
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

const app=express();


//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route
app.use("/api/user", userRoute);

port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running on port to ${port}`)
})