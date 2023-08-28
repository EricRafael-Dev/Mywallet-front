import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginContext = createContext();

export function LoginProvider ({children}) {

    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [user, setUser] = useState("");
    const [transitionsList, setTransitionsList] = useState([]);

    const loged = () => {
        let token = localStorage.getItem("token");

        if(token){
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            navigate("/");
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common['Authorization'] = "";
        navigate("/");
    }

    return (
        <LoginContext.Provider value={{ login, setLogin, transitionsList, setTransitionsList, user, setUser, loged, logout}}>
            {children}
        </LoginContext.Provider>
    )
}