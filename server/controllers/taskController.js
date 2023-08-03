import taskModel from "../models/taskModel.js";
import mongoose from "mongoose";

// get all tasks
const getAllTasksController = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tasks = await taskModel.find({user_id}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      tasks,
    });
  } catch (err) {
    // console.log(err);
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

// get single task
const getSingleTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Id!");
    }
    const task = await taskModel.findById(id);

    if (!task) {
      throw new Error("Task not found!");
    } else {
      res.status(200).send({
        success: true,
        task,
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

// create new task
const createTaskController = async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const user_id = req.user._id;

    const task = await taskModel.create({
      title,
      description,
      deadline,
      user_id,
    });

    res.status(200).send({
      success: true,
      task,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Failed to upload task [server error]",
      err,
    });
  }
};

// delete task
const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Id!");
    }

    const task = await taskModel.findByIdAndDelete(id);

    if (!task) {
      throw new Error("Task not found!");
    } else {
      res.status(200).send({
        success: true,
        task,
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

// update task
const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Id!");
    }

    const task = await taskModel.findByIdAndUpdate(id, {
      ...req.body,
    });

    if (!task) {
      throw new Error("Task not found!");
    } else {
      res.status(200).send({
        success: true,
        task,
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

export {
  getAllTasksController,
  getSingleTaskController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
};
