const express = require("express");
const cors = require("cors");
const validateDog = require("./middleware/dogMiddleware.js");

const app = express();

app.use(cors());
app.use(express.json());

let dogs = [];
let dogId = 1;

// Routes
app.get("/", (req, res) => {
  res.json({ message: "안녕하세요 강아지 서버 입니다." });
});

app.get("/dogs", (req, res) => {
  res.json(dogs);
});

app.post("/dogs", validateDog, (req, res) => {
  const newDog = { id: dogId++, ...req.body };
  dogs.push(newDog);
  res.status(201).json(newDog);
});

app.put("/dogs/:id", validateDog, (req, res) => {
  const dog = dogs.find((d) => d.id === parseInt(req.params.id));
  if (!dog) return res.status(404).json({ error: "Dog not found" });
  Object.assign(dog, req.body);
  res.json(dog);
});

app.delete("/dogs/:id", (req, res) => {
  const index = dogs.findIndex((d) => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Dog not found" });
  const deleted = dogs.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
