const express = require("express");
const jwt = require("jsonwebtoken");
const {getUserById} = require("../db/users");
const apiRouter = express.Router();


apiRouter.use(async (req,res,next)=>{
    const auth = req.header('Authorization');
    const prefix = "Bearer ";
    if(!auth){
        next();
    }else if(auth.startsWith(prefix)){
        const token = auth.slice(prefix.length);
        try{
            console.log("checking");
            const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
            const id = parsedToken && parsedToken.id;

            if (id){
                console.log(id);
                req.user = await getUserById(id);
                console.log("the request user", req.user);
                next();
        
            }
            
        }catch(err){
            next(err);
        }
    }else{
        next({name: "AuthorizationHeaderErrr", message:
            "Authorization token must start with 'Bearer '",
        });
    }
    
  

});

//ESTABLISING ROUTES
//{baseURL}/api/books
apiRouter.use("/books", require("./books"));
//{baseURL}/api/users
apiRouter.use("/users", require("./users"));

apiRouter.use("/reservations", require("./reservations"));

//baseurl/api
apiRouter.get("/", (req,res)=>{
    res.send("Hello from /api");
});


module.exports = apiRouter;