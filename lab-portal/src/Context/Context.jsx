import { createContext, useState, useEffect } from "react";
import axios from "../axios/axios.jsx";

export const Context = createContext();

const LabTechContext = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [labTech, setLabTech] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/labtech/me", { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(true);
                setLabTech(res.data.data);
            })
            .catch(() => {
                setIsAuthenticated(false);
                setLabTech({});
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Context.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            labTech,
            setLabTech,
            loading,
        }}>
            {children}
        </Context.Provider>
    );
};

export default LabTechContext;
