import { createContext,useState,useContext } from "react";

const NavbarContext = createContext();
export const NavbarProvider = ({ children }) => {
    const [active, setActive] = useState("Home");
  return (
    <NavbarContext.Provider value={{active, setActive}}>
      {children}
    </NavbarContext.Provider>
  );
};
export const useNavbar   = () => useContext(NavbarContext);