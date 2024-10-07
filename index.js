// server/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import studentRouters from "./routes/student.router.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  })
);
app.use(express.json());

// Define routes
app.use("/api/students", studentRouters);

// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
