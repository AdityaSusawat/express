import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config(); // to access process.env variables
} //if not in production environment

import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import flash from "express-flash"; //to display error msgs
import session from "express-session";
import methodOverride from "method-override";

import initializePassport from "./passport-config.js";
//const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => {
    return users.find((user) => user.email === email);
  },
  (id) => {
    return users.find((user) => user.id === id);
  }
);

const app = express();

app.set("view-engine", "ejs"); //now we can use ejs
app.use(express.urlencoded({ extended: false })); //allows us to use req.body.name
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //should we resave session variables if nothing has changed
    saveUninitialized: false, //do you want to save an empty value in this session
  })
);
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());

const users = [];

app.get("/", checkAuthenticated, (req, res) => {
  //run checkAuthenticated before the cb function => if the user is not authenticated, redirect to login page
  res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true, //flash messages that we mentioned in the done() in passport-config.js on errors?
  })
); //('strategy', list of options that we want to modify)

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
  console.log("Updated users list:", users);
});

app.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(8080, () => {
  console.log(`server running on http://localhost:8080`);
});
