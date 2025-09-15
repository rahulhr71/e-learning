// context/userContext.js
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userC, setUserC] = useState(null);

 
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserC(JSON.parse(savedUser));
    }
  }, []);

  
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

export const useAuth   = () => useContext(UserContext);
