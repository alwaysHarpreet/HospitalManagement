import { createContext, useState, useEffect } from "react";
import axios from "../axios/axios.jsx";

export const Context = createContext();

const DoctorContext = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [doctor, setDoctor] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/user/doctor/me", { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(true);
                setDoctor(res.data.data);
            })
            .catch(() => {
                setIsAuthenticated(false);
                setDoctor({});
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Context.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            doctor,
            setDoctor,
            loading,
        }}>
            {children}
        </Context.Provider>
    );
};

export default DoctorContext;
