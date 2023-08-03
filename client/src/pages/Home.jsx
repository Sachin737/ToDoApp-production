import React from "react";
import { useContext } from "react";

import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import ToggleMenu from "../components/ToggleMenu.jsx";
import { tasksContext } from "../context/tasksContext.js";

const Home = () => {
  const [tasks] = useContext(tasksContext);

  return (
    <>
      <ToggleMenu />
      <div className="home">
        <div className="tasks">
          {tasks?.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
        <TaskForm />
      </div>
    </>
  );
};

export default Home;
