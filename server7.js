import express from "express";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());

function generateRandomID(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, length + 3);
}

const users = [
  {
    id: generateRandomID(),
    name: "ABC",
    age: 22,
    passwordHash:
      "$2b$10$Tb3xTnpXcvvTKqZxj7QGUuZZrV56.G1mLAdiM7K8b6ISluwBtf/Nu",
  },
  {
    id: generateRandomID(),
    name: "BCD",
    age: 23,
    passwordHash:
      "$2b$10$loOvEq6bfHhMeIbDgdRkEukHMytr6Fz2NouWfZ13UmcoLILFoD9T6",
  },
];

const blogs = [];

function basicMiddleware(req, res, next) {
  console.log("Middleware executed");
  next();
}

//Add blog
app.post("/blogs", (req, res) => {
  try {
    const { title, description, author } = req.body;
    if (!title || !description || !author) {
      return res
        .status(401)
        .send({ message: "Title, description and author required." });
    }
    const newBlog = { id: generateRandomID(), title, description, author };
    blogs.push(newBlog);
    res.status(201).send(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Retrieve all blogs
app.get("/blogs", (req, res) => {
  try {
    if (blogs.length == 0) {
      return res.status(404).send({ message: "No blogs available" });
    }
    return res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Basic login using bcrypt
app.post("/login", basicMiddleware, async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = users.find((e) => e.name === name);
    if (!user) {
      return res.status(401).send({ message: "invalid username or password" });
    } else {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return res
          .status(401)
          .send({ message: "Invalid username or password" });
      } else {
        return res.status(200).json({ message: "Authenticated successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Check all users
app.get("/users", basicMiddleware, (req, res) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

//Add new user
app.post("/users", async (req, res) => {
  try {
    const { name, age, password } = req.body;

    if (!name || !age || !password) {
      return res
        .status(400)
        .send({ message: "Name, age and password are required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      name: name,
      age: age,
      passwordHash: passwordHash,
    };
    users.push(newUser);
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

//Check specific user with name
app.get("/users/:name", (req, res) => {
  try {
    const { name } = req.params;
    const user = users.find((user) => user.name === name);
    if (!user) {
      res.status(404).send({ error: "No user found" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
  }
});

//Delete a user
app.delete("/users", (req, res) => {
  try {
    const { id } = req.body;
    const idIndex = users.findIndex((user) => user.id === id);
    console.log(idIndex);
    if (idIndex === -1) {
      res.status(404).send({ error: "No user found" });
    } else {
      users.splice(idIndex, 1);
      res.status(200).send(users);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Update name
app.put("/users", (req, res) => {
  try {
    const { id, name } = req.body;
    const userToBeUpdated = users.find((user) => user.id === id);

    if (!userToBeUpdated) {
      res.status(404).send({ error: "No such user found" });
    }
    userToBeUpdated.name = name;
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  try {
    res.status(200).send({
      name: "ABC",
      age: 12,
    });
  } catch (error) {
    console.log(error);
  }
});

function testMiddleware(req, res, next) {
  console.log("Middleware executed");
  next();
}

app.post("/", testMiddleware, (req, res) => {
  try {
    const { logo } = req.body;

    if (!logo) {
      res.status(418).send({ message: "No Logo found" });
    }
    res.status(200).send({ tshirt: `Your tshirt logo is: ${logo}` });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3737, () => {
  console.log("listening on http://localhost:3737");
});
