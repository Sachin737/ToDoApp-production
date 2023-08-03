import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios";
import { useContext } from "react";
import { authContext } from "./authContext.js";

const tasksContext = createContext();

const TasksProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          throw Error("Please login");
        }
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/tasks`,
          {
            headers: {
              Authorization: user?.token,
            },
          }
        );
        setTasks(data?.tasks);
      } catch (err) {
        // console.log(err);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <tasksContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </tasksContext.Provider>
  );
};

export { TasksProvider, tasksContext };
