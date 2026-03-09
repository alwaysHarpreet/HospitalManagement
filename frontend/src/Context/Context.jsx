import { createContext, useState, useEffect } from "react";
import axios from "../axios/axios.jsx";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/user/patient/me", { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data.data);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser({});
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
