const express = require("express");
const router = express.Router();

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://<login>:<password>@students.n5vsa8d.mongodb.net/?retryWrites=true&w=majority";
var client = new MongoClient(uri);
const database = client.db("Students");
const col = database.collection("Student");

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  const students = await col.find(searchOptions).toArray();
  res.render("students", { students: students, searchOptions: req.query });
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/new", async (req, res) => {
  await col.insertOne({
    index: parseInt(req.body.index),
    isActive: req.body.isActive,
    age: parseInt(req.body.age),
    eyeColor: req.body.eyeColor,
    name: req.body.name,
    indexNumber: parseInt(req.body.indexNumber),
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    schoolGrade: req.body.schoolGrade,
  });
  res.redirect("/");
});

router.get("/:id/edit", async (req, res) => {
  let student = await col.findOne({ index: parseInt(req.params.id) });
  res.render("edit", { student: student });
});

router.post("/:id", async (req, res) => {
  await col.updateOne(
    {
      index: parseInt(req.params.id),
    },
    {
      $set: {
        index: parseInt(req.body.index),
        isActive: req.body.isActive,
        age: req.body.age,
        eyeColor: req.body.eyeColor,
        name: req.body.name,
        indexNumber: req.body.indexNumber,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        schoolGrade: req.body.schoolGrade,
      },
    }
  );
  res.redirect("/");
});

router.get("/:id/delete", async (req, res) => {
  await col.deleteOne({
    index: parseInt(req.params.id),
  });
  res.redirect("/");
});

module.exports = router;
