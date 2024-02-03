import { useState, createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userStudent, setUserStudent] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser, userStudent, setUserStudent }}>
        {children}
        </UserContext.Provider>
    );
}
