// context/userContext.js
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userC, setUserC] = useState(null);

  // 🔹 Page refresh hone par localStorage se user load karo
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserC(JSON.parse(savedUser));
    }
  }, []);

  // 🔹 Jab bhi userC change ho, localStorage update karo
  useEffect(() => {
    if (userC) {
      localStorage.setItem("user", JSON.stringify(userC));
    } else {
      localStorage.removeItem("user");
    }
  }, [userC]);

  return (
    <UserContext.Provider value={{ userC, setUserC }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
