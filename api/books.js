const express = require("express");

const bookRouter = express.Router();
// {basURL}/users/me
bookRouter.get("/", (req,res)=>{
    res.send("Here are the books");
});

module.exports = bookRouter