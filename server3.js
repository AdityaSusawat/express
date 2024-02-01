import express from "express";

const app = express();

app.listen(7373, () => {
  console.log("Listening on http://localhost:7373");
});
