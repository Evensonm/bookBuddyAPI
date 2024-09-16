const express = require("express");
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

require("dotenv").config();

const client = require("./db/client");

app.use(cors());

client.connect();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// console.log(process.env.JWT_SECRET);

app.use(express.json());
// /api -> send to /api/index.js
// express will look for index.js folder.
// that is why duplicate name under api folder
app.use("/api", require("./api"));
// app.use("/db", require("./db"));

//SENDING MESSAGE TO BROWSER INDICATING PAGE IS LIVE AND FROM WHERE
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.get("*", (req,res)=>{
  res.status(404).send({error:"404 - Not Found", 
    message:"No route found for requested URL"})
});

app.use((err, req, res, next) => {
  console.log("error", error);
  if(res.statusCode < 400) res.status(500);
  res.send({message : error.message,
    name: error.name,
  });
});

//LOG THAT PORT IS ACTIVE
//updated app

app.listen(PORT, () => {
  console.log(`Server alive on port ${PORT}`);
});
