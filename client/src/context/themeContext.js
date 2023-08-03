import { useState } from "react";
import { createContext } from "react";

const themeContext = createContext();

const ThemeProvider = (props) => {
  let val = localStorage.getItem("theme");
  if (!val) val = "light";
  const [theme, setTheme] = useState(val);

  return (
    <themeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </themeContext.Provider>
  );
};

export { themeContext, ThemeProvider };
