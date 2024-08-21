const express = require("express");

const apiRouter = express.Router();
//ESTABLISING ROUTES
//{baseURL}/api/books
apiRouter.use("/books", require("./books"));
//{baseURL}/api/users
apiRouter.use("/users", require("./users"));

//baseurl/api
apiRouter.get("/", (req,res)=>{
    res.send("Hello from /api");
});


module.exports = apiRouter;