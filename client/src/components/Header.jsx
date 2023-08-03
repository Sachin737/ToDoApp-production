import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { themeContext } from "../context/themeContext";
import Switch from "react-switch";
import { authContext } from "../context/authContext.js";
import { tasksContext } from "../context/tasksContext";

const Header = () => {
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
    <header>
      <div className="container">
        <Link to="/">
          <h1>To Do App</h1>
        </Link>
      </div>
      <div className="right">
        <div className="links">
          {user ? (
            <>
              {user.name.length <= 20 ? (
                <p className="username">{user.name}</p>
              ) : (
                <p className="username">{user.name.substr(0, 20)}...</p>
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
        </div>

        <div className="theme-toggle">
          <h4>{theme}</h4>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
