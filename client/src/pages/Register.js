import axios from "axios";
import React, { useState } from "react";
import ToggleMenu from "../components/ToggleMenu.jsx";
import { useContext } from "react";
import { authContext } from "../context/authContext.js";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setisLoading] = useState(null);
  const [user, setUser] = useContext(authContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/user/register`,
        { name, email, password }
      );

      if (data.success) {
        // saving json token on local storage
        localStorage.setItem("user", JSON.stringify(data.user));

        //   Update auth context states
        setUser(data.user);

        toast.success(data.message);
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
      <form className="register" onSubmit={submitHandler}>
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
          autoComplete="off"
        />
        <button disabled={isLoading}>Register</button>
      </form>
    </>
  );
};

export default Register;
