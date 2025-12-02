const express = require("express");
const cors = require("cors");
const validateDog = require("./middleware/dogMiddleware.js");
const prisma = require("./prisma/client.js");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "안녕하세요 강아지 서버 입니다." });
});

app.get("/dogs", async (req, res) => {
  try {
    const dogs = await prisma.dogs.findMany();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dogs" });
  }
});

app.get("/dogs/:id", async (req, res) => {
  try {
    const dog = await prisma.dogs.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.json(dog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dog" });
  }
});

app.post("/dogs", validateDog, async (req, res) => {
  const { name, breed, age } = req.body;

  try {
    const newDog = await prisma.dogs.create({
      data: {
        name: name,
        breed: breed,
        age: age,
      },
    });
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: "Failed to create dog" });
  }
});

app.put("/dogs/:id", validateDog, async (req, res) => {
  try {
    const dog = await prisma.dogs.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(dog);
  } catch (error) {
    res.status(404).json({ error: "Dog not found" });
  }
});

app.delete("/dogs/:id", async (req, res) => {
  try {
    const deleted = await prisma.dogs.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(deleted);
  } catch (error) {
    res.status(404).json({ error: "Dog not found" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
