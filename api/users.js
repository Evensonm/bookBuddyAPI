const express = require("express");

const userRouter = express.Router();
// {basURL}/users/me
userRouter.get("/me", (req,res)=>{
    res.send("Here is your account info");
});


// post request to {baseURL/api/users/register
userRouter.post("/register", (req,res)=>{
    console.log("REQUEST BODY", req.body);
    res.send("User registered");
});

userRouter.post("/login", (req,res)=>{
    console.log("REQUEST BODY", req.body);
    res.send("Login successful");
});



module.exports = userRouter;
