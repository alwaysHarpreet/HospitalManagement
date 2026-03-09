import { createContext, useState, useEffect } from "react";
import axios from "../axios/axios.jsx";

export const Context = createContext();

const AppContext = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/user/admin/me", { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(true);
                setAdmin(res.data.data);
            })
            .catch(() => {
                setIsAuthenticated(false);
                setAdmin({});
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Context.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            admin,
            setAdmin,
            loading,
        }}>
            {children}
        </Context.Provider>
    );

}

export default AppContext;