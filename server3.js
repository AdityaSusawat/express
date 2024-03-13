import express from "express";
import mongoose from "mongoose";
import { Game } from "./models/gameModel.js";
import { User } from "./models/gameModel.js";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());

//Register user
app.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`hashedPass: ${hashedPassword}, password: ${password}`);
    const user = await User.create({ email, hashedPassword });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
});

//Get users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
});

//Get a specific user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).send("No such user");
    if (
      user.email === req.body.email &&
      (await bcrypt.compare(req.body.password, user.hashedPassword))
    )
      return res.status(200).json(user);
    res.send("Invalid credentials");
  } catch (error) {
    console.log(error.message);
  }
});

//Change password
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("No such user");
    }
    if (await bcrypt.compare(req.body.password, user.hashedPassword))
      res.status(400).send("Same password");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log();
    const newUser = await User.findByIdAndUpdate(id, {
      hashedPassword: hashedPassword,
    });
    res.status(200).send(newUser);
  } catch (error) {
    console.error(error);
  }
});

//Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(204).send(user);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/games", async (req, res) => {
  try {
    const games = await Game.find({});
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: error.message });
  }
});
app.get("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ message: `Game with id ${id} not found` });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error(`Error fetching product with the id: ${id}: `, error);
    res.status(404).json({ message: error.message });
  }
});

app.put("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findByIdAndUpdate(id, req.body);
    if (!game) {
      return res
        .status(404)
        .json({ message: `No game with this id(${id}) found` });
    }
    const updatedGame = await Game.findById(id);
    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Couldn't update: ", error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findByIdAndDelete(id);
    if (!game) {
      return res.status(404).json({ message: error.message });
    }
    res.status(200).send(game);
  } catch (error) {
    console.error(`game with this id(${id}) doesn't exist: `, error);
  }
});

app.post("/games", async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(200).json(game);
  } catch (error) {
    console.error("Couldn't send response", error);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.b8nk7ss.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    try {
      app.listen(7373, () => {
        console.log("Listening on http://localhost:7373");
      });
    } catch (error) {
      console.error("Couldn't start the server: ", error);
    }
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB: ", error);
  });
