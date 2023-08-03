import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ToggleMenu from "../components/ToggleMenu.jsx";
import { authContext } from "../context/authContext.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(null);
  const [user, setUser] = useContext(authContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/user/login`,
        { email, password }
      );

      if (data.success) {
        // saving json token on local storage
        localStorage.setItem("user", JSON.stringify(data.user));

        //   Update auth context states
        setUser(data.user);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      //   stop loading state
      setisLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setisLoading(false);
      //   console.log(err);
    }
  };

  return (
    <>
      <ToggleMenu />
      <form className="login" onSubmit={submitHandler}>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading}>Log in</button>
      </form>
    </>
  );
};

export default Login;
