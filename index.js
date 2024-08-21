const express = require("express");
const app = express();

const PORT = 3000;

require("dotenv").config();

const client = require("./db/client");

client.connect();

app.use(express.json());
// /api -> send to /api/index.js
// express will look for index.js folder.
// that is why duplicate name under api folder
app.use("/api", require("./api"));

//SENDING MESSAGE TO BROWSER INDICATING PAGE IS LIVE AND FROM WHERE
app.get("/", (req, res) => {
  res.send("Hello from server");
});

//LOG THAT PORT IS ACTIVE

app.listen(PORT, () => {
  console.log(`Server alive on port ${PORT}`);
});
