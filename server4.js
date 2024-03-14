import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

let baseID = Date.now();
function generateRandomID(n = 1) {
  return (baseID = baseID + n);
}

let users = [
  {
    id: generateRandomID(),
    email: "ABC",
    age: 12,
    hashedPassword: "SomeHashedPassword",
  },
  {
    id: generateRandomID(),
    email: "BCD",
    age: 13,
    hashedPassword: "SomeHashedPassword2",
  },
];

//middleware for authentication
let loggedInUser = null;
function isLoggedIn(req, res, next) {
  if (!loggedInUser) {
    res.status(401).send({ error: "Unauthorized: User not logged in" });
  } else {
    next();
  }
}

//Create a user / SignUp
app.post("/users", async (req, res) => {
  console.time("timeToCreate");
  const { email, age, password } = req.body;

  if (!email || !age || !password) {
    return res
      .status(401)
      .send({ message: "email, age and password are required" });
  }

  if (users.find((e) => e.email === email)) {
    return res
      .status(409)
      .send({ message: "This email is already being used by another user" });
  }

  const newUser = {
    id: generateRandomID(),
    email,
    age,
    hashedPassword: await bcrypt.hash(password, 10),
  };

  users.push(newUser);

  console.timeEnd("timeToCreate");
  return res.status(200).send(newUser);
});

//Retrieve all users
app.get("/users", (req, res) => {
  console.time("timeToRetrieve");
  try {
    if (users.length === 0) {
      return res.status(404).send("No users found");
    }
    console.timeEnd("timeToRetrieve");
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

//Update a user
app.put("/users", isLoggedIn, async (req, res) => {
  try {
    const { email, newAge, newPassword } = req.body;

    if (!email) {
      return res.status(404).send({ error: "Please provide an email" });
    }

    if (!newAge && !newPassword) {
      return res.status(401).send({ error: "Provide a newAge or newPassword" });
    }

    const user = users.find((e) => e.email === email);
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    if (newAge && newAge != user.age) {
      user.age = newAge;
    }

    if (newPassword) {
      const isSame = await bcrypt.compare(newPassword, user.hashedPassword);
      if (!isSame) {
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        user.hashedPassword = newPasswordHash;
      }
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

//Delete a user
app.delete("/users", isLoggedIn, async (req, res) => {
  console.time("timeToDelete");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({ error: "Email and password are required" });
    }

    const user = users.find((e) => e.email === email);

    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    //const indexToBeRemoved = users.findIndex((e) => e.email === email);

    const indexToBeRemoved = users.indexOf(user);
    users.splice(indexToBeRemoved, 1);

    //users = users.filter((e) => e.email != user.email);

    console.timeEnd("timeToDelete");
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ error: "email and password required" });
    }

    const user = users.find((e) => e.email === email);
    if (!user) {
      return res.status(404).send({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    loggedInUser = user;
    return res.status(200).send({ message: `Logged in as ${user.email}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(3737, () => {
  console.log("Running on http://localhost:3737");
});
