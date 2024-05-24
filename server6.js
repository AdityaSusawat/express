import express from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

const users = [
  {
    id: crypto.randomUUID(),
    userName: "User1",
    age: 18,
    hashedPassword: "someHashedPassword1",
  },
  {
    id: crypto.randomUUID(),
    userName: "User2",
    age: 19,
    hashedPassword: "someHashedPassword2",
  },
];

app.get("/users", (req, res) => {
  const allUsers = users.map((user) => {
    return { userName: user.userName, age: user.age };
  });
  return res.status(200).send(allUsers);
});

app.post("/users", (req, res) => {
  const { userName, age, password } = req.body;

  if (!userName || !age || !password) {
    return res.status(401).send("userName, age, password are required");
  }

  if (users.find((user) => user.userName === userName)) {
    return res.status(409).send("This userName already exists");
  }

  users.push({
    id: crypto.randomUUID(),
    userName,
    age,
    hashedPassword: bcrypt.hash(password, 10),
  });

  return res.status(200).send({ userName, age });
});

app.listen(3000, () => console.log(`Now listening on http://localhost:3000`));
console.log(users);
