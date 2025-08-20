import { createContext, useContext } from 'react';
const usercontext = createContext();
import { useState ,useEffect} from "react";
export const UserProvider = ({ children }) => {

    const [userC, setUserC] = useState(localStorage.getItem('login user') || null);
    useEffect(() => {
         const storedUser = localStorage.getItem('login user');
         if (storedUser) {
             setUserC(storedUser);
         }
     }, [userC]);


 
    localStorage.setItem('login user', userC);

    return (
        <usercontext.Provider value={{ userC, setUserC }}>
            {children}
        </usercontext.Provider>
    );
};
export const useUser  = () => useContext(usercontext);