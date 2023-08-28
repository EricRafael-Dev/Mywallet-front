import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider ({children}) {

    const [login, setLogin] = useState('');
    const [screen3, setScreen3] = useState(false);
    const [user, setUser] = useState("");
    const [transitionsList, setTransitionsList] = useState([]);

    return (
        <LoginContext.Provider value={{ login, setLogin, transitionsList, setTransitionsList, screen3, setScreen3, user, setUser}}>
            {children}
        </LoginContext.Provider>
    )
}