import { useState, createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userStudent, setUserStudent] = useState({});
    const [admin, setAdmin] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser, userStudent, setUserStudent, admin, setAdmin }}>
        {children}
        </UserContext.Provider>
    );
}
