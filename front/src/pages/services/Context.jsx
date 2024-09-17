import { useState } from "react";
import { useContext, createContext } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const userStorage = localStorage.getItem("user");
  const userData =
    userStorage === undefined || userStorage === null
      ? null
      : JSON.parse(userStorage);

  const [user, setUser] = useState(userData);

  const loginUser = (userData) => {
    if (userData) {
      // console.log(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <MyContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
