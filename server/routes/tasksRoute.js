import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getSingleTaskController,
  updateTaskController,
} from "../controllers/taskController.js";

const router = express.Router();

// Token verification
router.use(requireAuth);

//  ALL TASKS ROUTE
router.get("/", getAllTasksController);

// GET SINGLE TASK BY ID
router.get("/:id", getSingleTaskController);

// POST NEW TASK
router.post("/", createTaskController);

// DELETE TASK
router.delete("/:id", deleteTaskController);

// UPDATE NEW TASK
router.patch("/:id", updateTaskController);

export default router;
