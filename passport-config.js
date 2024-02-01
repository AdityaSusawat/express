//All passport related stuff

import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

export default function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user with that email" }); //(error, user we found, a message to be displayed)
    }
    //User found, check if password is correct
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser)); //specify what usernameField, passwordField etc are called in our form and then call the cb for handling authentication

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}
