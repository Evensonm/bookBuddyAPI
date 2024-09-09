const express = require("express");
const {
  getUsersReservations,
  getUsers,
  getUserById,
  createUser,
  getUserByEmail,
  getUser,
} = require("../db/users");
const userRouter = express.Router();
// {basURL}/users/me

const jwt = require("jsonwebtoken");

const {requireUser} = require("./utils");

userRouter.get("/me", requireUser, async (req, res, next) => {
  try{
    if(req.user){
      const userReservations = await getUsersReservations(req.user.id);
      console.log(userReservations);
      req.user.books = userReservations;
      res.send(req.user);
    } else {
      res.send("Make sure you are logged in");
    }

  }catch(err){}
});

// post request to {baseURL/api/users/register
userRouter.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!password) {
    res.send("Password not provided");
    return;
  }
  if (!email) {
    res.send("Email not provided");
    return;
  }
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.send("User already exists with that email");
      return;
    }
    const result = await createUser(req.body);
    if (result) {
      const token = jwt.sign({ id: result.id, email }, process.env.JWT_SECRET, {
        expiresIn: "1w",
      });
      console.log(token);
      res.send({
        message: "registration successfull",
        token,
        user: {
          id: result.id,
          firstname: result.firstname,
          lastname: result.lastname,
          email: result.email,
        },
      });
      return;
    } else {
      res.send("error registering, try later");
    console.log(result);
    res.send("success");
  return}
  } catch (err) {
    res.send(err);
  }
});

//{baseUrl}/api/users/login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("Missing credentials");
    return;
  }
  try {
    const result = await getUser(req.body);
    if(result){
      const token = jwt.sign({id: result.id, email }, process.env.JWT_SECRET, {
        expiresIn: "1w",});
        res.send({
          message: "registration successfull",
          token,});}
    else{
      res.send("wrong credentials")

      }
    
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

//{baseUrl}/api/users **get all users

userRouter.get("/", async (req, res) => {
  try {
    const results = await getUsers();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "something went wrong" });
  }
});

//{baseUrl}/api/users/:id **get user by ID

userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getUserById(id);
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send({ err, message: "something went wrong" });
  }
});

userRouter.get("/test", async (req, res, next) => {
  try {
    resjson();
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;

// console.log("REQUEST BODY", req.body);
// res.send("User registered");
