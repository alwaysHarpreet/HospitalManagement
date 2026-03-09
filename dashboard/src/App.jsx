import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// import files
import AppContext from "./Context/Context.jsx";
import { Context } from "./Context/Context.jsx";
import {
  Home,
  SideNavbar,
  Login,
  Doctors,
  AddDoctor,
  Patients,
  Appointments,
  Departments,
  Staff,
  AddAdmin,
  Medicines,
  AddMedicine,
  Billing,
  Reports,
  Messages,
  AddLabTech,
} from "./import-export/ImportExport.js";

function AppRoutes() {
  const { isAuthenticated, loading } = useContext(Context);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && <SideNavbar />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/doctors" element={isAuthenticated ? <Doctors /> : <Navigate to="/login" />} />
        <Route path="/doctors/add" element={isAuthenticated ? <AddDoctor /> : <Navigate to="/login" />} />
        <Route path="/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/login" />} />
        <Route path="/appointments" element={isAuthenticated ? <Appointments /> : <Navigate to="/login" />} />
        <Route path="/departments" element={isAuthenticated ? <Departments /> : <Navigate to="/login" />} />
        <Route path="/staff" element={isAuthenticated ? <Staff /> : <Navigate to="/login" />} />
        <Route path="/staff/add" element={isAuthenticated ? <AddAdmin /> : <Navigate to="/login" />} />
        <Route path="/medicines" element={isAuthenticated ? <Medicines /> : <Navigate to="/login" />} />
        <Route path="/medicines/add" element={isAuthenticated ? <AddMedicine /> : <Navigate to="/login" />} />
        <Route path="/billing" element={isAuthenticated ? <Billing /> : <Navigate to="/login" />} />
        <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/messages" element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} />
        <Route path="/labtech/add" element={isAuthenticated ? <AddLabTech /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <AppRoutes />
        <ToastContainer position="top-right" />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
