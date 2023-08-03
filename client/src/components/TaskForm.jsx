import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "../context/authContext";
import { tasksContext } from "../context/tasksContext";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlinestr, setDeadlinestr] = useState("");
  const [tasks, setTasks] = useContext(tasksContext);
  const [user, setUser] = useContext(authContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!title.length) {
        throw new Error("Please add task title!");
      }
      if (!user) {
        throw Error("Please login");
      }

      const deadline = new Date(deadlinestr);
      const task = { title, description, deadline };
      const headers = {
        "Content-Type": "application/json",
        Authorization: user?.token,
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/tasks`,
        task,
        {
          headers,
        }
      );
      if (data.success) {
        setTasks([data.task, ...tasks]);
        toast.success("Task added successfully!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form className="create" onSubmit={submitHandler}>
      <h3>Add new task</h3>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Deadline:</label>
      <input
        type="datetime-local"
        onChange={(e) => setDeadlinestr(e.target.value)}
        value={deadlinestr}
      />

      <button>Add task</button>
    </form>
  );
};

export default TaskForm;
