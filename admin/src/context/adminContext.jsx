import {  useContext,useState,createContext } from "react";
const AdminContext = createContext();
export const AdminProvider= ({ children }) => {
  const [activeComponent, setActiveComponent] = useState('home');

  return (
    <AdminContext.Provider value={{ activeComponent, setActiveComponent}}>
      {children}
    </AdminContext.Provider>
  );
}
export const useAdmin = () => useContext(AdminContext);