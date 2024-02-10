import { useState, createContext, useEffect } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [Uteacher, setUteacher] = useState({});
    const [Ustudent, setUstudent] = useState({});

    useEffect(() => {
        setUstudent(JSON.parse(localStorage.getItem('Ustudent')||'{}'));
        setUteacher(JSON.parse(localStorage.getItem('Uteacher')||'{}'));
        console.log('useEffect', Ustudent, Uteacher);
    }, [])

    return (
        <UserContext.Provider value={{ Uteacher, setUteacher, Ustudent, setUstudent }}>
        {children}
        </UserContext.Provider>
    );
}