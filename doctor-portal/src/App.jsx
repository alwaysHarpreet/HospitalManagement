import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorContext, { Context } from "./Context/Context.jsx";
import SideNavbar from "./components/SideNavbar.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Appointments from "./pages/Appointments.jsx";
import Patients from "./pages/Patients.jsx";

function AppRoutes() {
  const { isAuthenticated, loading } = useContext(Context);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && <SideNavbar />}
      <div className={isAuthenticated ? "md:ml-64 p-6 min-h-screen" : ""}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/appointments" element={isAuthenticated ? <Appointments /> : <Navigate to="/login" />} />
          <Route path="/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DoctorContext>
        <AppRoutes />
        <ToastContainer position="top-right" />
      </DoctorContext>
    </BrowserRouter>
  );
}

export default App;
