import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./db.js";
import tasksRoute from "./routes/tasksRoute.js";
import userRoute from "./routes/userRoute.js";
import path from "path";

dotenv.config();

// App
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/tasks", tasksRoute);
app.use("/api/user", userRoute);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// database connection
connectDB();

//  PORT
const PORT = process.env.PORT || 9000;

// listen for request
app.listen(PORT, () => {
  console.log(`Listening on port no. ${PORT}`.bgYellow.black);
});
