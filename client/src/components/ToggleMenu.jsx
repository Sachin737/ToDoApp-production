import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { themeContext } from "../context/themeContext";

import Switch from "react-switch";
import { authContext } from "../context/authContext";
import { tasksContext } from "../context/tasksContext";

const ToggleMenu = () => {
  const [theme, setTheme] = useContext(themeContext);
  const [checked, setChecked] = useState(theme === "dark");
  const [user, setUser] = useContext(authContext);
  const [tasks, setTasks] = useContext(tasksContext);

  const logout = () => {
    // remove user from global context
    setUser(null);
    // remove user from local storage
    localStorage.removeItem("user");

    setTasks(null);
  };

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    setChecked(1 - checked);
    setTheme(newTheme);
  };

  return (
    <div id="menuToggle">
      <input type="checkbox" />
      <span />
      <span />
      <span />
      <ul id="menu">
        <h3>
          <Link to="/">
            <h1>To Do App</h1>
          </Link>
        </h3>
        {user ? (
          <>
            {user.name.length <= 20 ? (
              <p className="username1">{user.name}</p>
            ) : (
              <p className="username1">{user.name.substr(0, 20)}...</p>
            )}
            <h3>
              <Link onClick={logout}>Logout</Link>
            </h3>
          </>
        ) : (
          <>
            <h3>
              <Link to={"/login"}>Login</Link>
            </h3>
            <h3>
              <Link to={"/register"}>Register</Link>
            </h3>
          </>
        )}

        <h3>{theme}</h3>
        <Switch
          onChange={switchTheme}
          checked={checked}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={12}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={42}
          className="react-switch"
          id="material-switch"
        />
      </ul>
    </div>
  );
};

export default ToggleMenu;
