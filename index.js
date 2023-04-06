const express = require("express");
const app = express();
const { readFile } = require("fs").promises;
const path = require("path");

app.get("/", async (req, res) => {
  res.send(await readFile("index.html", "utf8"));
});

app.use(express.static(path.join(__dirname, "public")));
app.listen(3000);
console.log("Listening at http://localhost:3000...");
