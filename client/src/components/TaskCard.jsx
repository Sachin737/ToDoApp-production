import React from "react";
import { Trash } from "@phosphor-icons/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { tasksContext } from "../context/tasksContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { authContext } from "../context/authContext";

//  convert date according to user location
const convertDate = (deadline) => {
  const date = new Date(deadline);

  const formattedDate = new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });
  return formattedDate;
};

const TaskCard = ({ task }) => {
  const { _id, title, description, deadline, createdAt } = task;
  const [user, setUser] = useContext(authContext);

  let FormattedDeadline = convertDate(deadline);

  if (FormattedDeadline?.substr(10, 4) === "1970") {
    FormattedDeadline = "none";
  }

  const [tasks, setTasks] = useContext(tasksContext);

  const deleteHandler = async () => {
    try {
      if (!user) {
        throw Error("Please login");
      }
      
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/tasks/${_id}`,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );

      if (data.success) {
        const updatedTasks = tasks.filter((t) => t._id !== _id);
        setTasks(updatedTasks);
        toast.success("Task deleted successfully!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="task-details">
      <button onClick={deleteHandler}>
        <Trash color="#e40035" weight="fill" size={28} />
      </button>

      <h4>{title}</h4>
      <p className="deadline">
        <strong>deadline: </strong> {FormattedDeadline}
      </p>

      <p className="description">
        <strong>description: </strong>
      </p>

      <div className="description-box">{description}</div>

      <div className="createdAt">
        <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      </div>
    </div>
  );
};
export default TaskCard;
