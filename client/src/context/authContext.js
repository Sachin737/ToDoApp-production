import { useEffect } from "react";
import { createContext, useState } from "react";

const authContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const iuser =
      localStorage.getItem("user") != null
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    setUser(iuser);
  }, []);

  return (
    <authContext.Provider value={[user, setUser]}>
      {props.children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
