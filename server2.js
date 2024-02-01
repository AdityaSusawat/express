import express from "express";
import { readFile, writeFile } from "fs/promises";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const data = await readFile("./gameData.json", "utf-8");
    const jsonData = data ? JSON.parse(data) : [];
    res.render("home.ejs", { data: jsonData });
  } catch (error) {
    console.error("ERROR READING FILE: ", error);
    res.render("home.ejs", { data: [] });
  }
});

app.get("/insert", (req, res) => {
  res.render("insert.ejs");
});
app.post("/insert", async (req, res) => {
  //console.log(typeof req.body); //to read req.body.something, we need app.use(express.urlencoded({ extended: false }))
  try {
    const data = await readFile("./gameData.json", "utf-8"); //for await to work, we need to import from "fs/promises"
    console.log(`the type of data after readFile is ${typeof data}`);
    const jsonData = data ? JSON.parse(data) : [];

    jsonData.push(req.body);

    await writeFile(
      "./gameData.json",
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
    console.log("data inserted successfully");
    res.redirect("/");
  } catch (error) {
    console.error("THERE WAS AN ERROR WHILE INSERTING: ", error);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});

app.get("/remove", (req, res) => {
  try {
    //code to remove data
  } catch (error) {
    console.error("ERROR WHILE REMOVING DATA: ", error);
  }
});

app.listen(3737, () => {
  console.log("listening on http://localhost:3737");
});
