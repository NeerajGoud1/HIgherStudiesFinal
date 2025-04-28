import express from "express";
import mongoose from "mongoose";
import { createServer } from "node:http";
import higherStudiesRoutes from "./routes/higherStudiesRoutes.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const server = createServer(app);

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for parsing post request

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  college: String,
  student_id: String,
  employee_id: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running" });
});

// Register route
app.post("/api/auth/register", async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    const {
      name,
      email,
      password,
      userType,
      college,
      student_id,
      employee_id,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      college,
      student_id,
      employee_id,
    });

    await user.save();
    console.log("User registered successfully:", user.email);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login route with additional logging
app.post("/api/auth/login", async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { email, password, userType } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      "your_jwt_secret",
      { expiresIn: "1d" }
    );

    console.log("Login successful for user:", email);
    res.json({
      token,
      userType: user.userType,
      name: user.name,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a test account route
app.post("/api/create-test-account", async (req, res) => {
  try {
    const { userType = "student" } = req.body;

    let testUser;

    if (userType === "student") {
      testUser = {
        name: "Test Student",
        email: "test.student@example.com",
        password: "Test@123",
        userType: "student",
        college: "Test College",
        student_id: "ST12345",
      };
    } else {
      testUser = {
        name: "Test Faculty",
        email: "test.faculty@example.com",
        password: "Test@123",
        userType: "faculty",
        college: "Test College",
        employee_id: "EMP12345",
      };
    }

    // Check if test user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      return res.json({ message: "Test account already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testUser.password, salt);

    // Create new user
    const user = new User({
      ...testUser,
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: "Test account created successfully" });
  } catch (error) {
    console.error("Error creating test account:", error);
    res.status(500).json({ message: "Server error creating test account" });
  }
});

app.use("/api/higherStudies", higherStudiesRoutes);

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).json({ message });
});

const start = async () => {
  await mongoose.connect(
    "mongodb+srv://neeraj:neeraj@higherstudiesfp.qfkw1bh.mongodb.net/"
  );

  console.log("connected to DB");
  server.listen("5000", () => {
    console.log("Server is running on port 5000");
  });
};

start();
