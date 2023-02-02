const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));
app.use(express.static("views"));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index");
});

const students = require("./routes/students");
app.use("/students", students);

app.listen(3000, () => console.log("Server Started"));
