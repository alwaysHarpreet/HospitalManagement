import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LabTechContext, { Context } from "./Context/Context.jsx";
import SideNavbar from "./components/SideNavbar.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TestRequests from "./pages/TestRequests.jsx";
import UploadReport from "./pages/UploadReport.jsx";
import LabRecords from "./pages/LabRecords.jsx";

function AppRoutes() {
  const { isAuthenticated, loading } = useContext(Context);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && <SideNavbar />}
      <div className={isAuthenticated ? "md:ml-64 p-6 min-h-screen bg-gray-50" : ""}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/test-requests" element={isAuthenticated ? <TestRequests /> : <Navigate to="/login" />} />
          <Route path="/upload-report" element={isAuthenticated ? <UploadReport /> : <Navigate to="/login" />} />
          <Route path="/records" element={isAuthenticated ? <LabRecords /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LabTechContext>
        <AppRoutes />
        <ToastContainer position="top-right" />
      </LabTechContext>
    </BrowserRouter>
  );
}

export default App;
