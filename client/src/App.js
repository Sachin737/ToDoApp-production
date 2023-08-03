import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import { useContext } from "react";
import { themeContext } from "./context/themeContext.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import { authContext } from "./context/authContext.js";

function App() {
  const [theme] = useContext(themeContext);
  const [user, setUser] = useContext(authContext);

  return (
    <>
      <div className="App" data-theme={theme}>
        <Header />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/register"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
