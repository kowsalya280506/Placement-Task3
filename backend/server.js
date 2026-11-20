
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Placement Task 3 API is running");
});

// GET all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one student
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: "Invalid student ID" });
  }
});

// POST new student
app.post("/api/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      message: "Student added successfully",
      student
    });
  } catch (error) {
    const status = error.code === 11000 ? 409 : 400;

    res.status(status).json({
      message: error.code === 11000
        ? "Register number already exists"
        : error.message
    });
  }
});

// PUT update student
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    const status = error.code === 11000 ? 409 : 400;

    res.status(status).json({
      message: error.code === 11000
        ? "Register number already exists"
        : error.message
    });
  }
});

// DELETE student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid student ID" });
  }
});

// Connect Atlas and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Project 3 backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Atlas Connection Failed:", error.message);
  });
