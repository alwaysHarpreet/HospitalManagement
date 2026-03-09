import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Context/Context.jsx";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import {
  RiDashboardLine,
  RiUserLine,
  RiStethoscopeLine,
  RiCalendarCheckLine,
  RiBuilding2Line,
  RiTeamLine,
  RiMoneyDollarCircleLine,
  RiBarChartLine,
  RiMailLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiCloseLine,
  RiMedicineBottleLine,
  RiTestTubeLine,
} from "react-icons/ri";

const navItems = [
  { path: "/", label: "Dashboard", icon: RiDashboardLine },
  { path: "/doctors", label: "Doctors", icon: RiStethoscopeLine },
  { path: "/patients", label: "Patients", icon: RiUserLine },
  { path: "/appointments", label: "Appointments", icon: RiCalendarCheckLine },
  { path: "/departments", label: "Departments", icon: RiBuilding2Line },
  { path: "/staff", label: "Staff", icon: RiTeamLine },
  { path: "/medicines", label: "Medicines", icon: RiMedicineBottleLine },
  { path: "/labtech/add", label: "Add Lab Tech", icon: RiTestTubeLine },
  { path: "/billing", label: "Billing", icon: RiMoneyDollarCircleLine },
  { path: "/reports", label: "Reports", icon: RiBarChartLine },
  { path: "/messages", label: "Messages", icon: RiMailLine },
];

function SideNavbar() {
  const { setIsAuthenticated, setAdmin, admin } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("/user/admin/logout", { withCredentials: true });
      setIsAuthenticated(false);
      setAdmin({});
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 md:hidden bg-indigo-600 text-white p-2 rounded-md"
      >
        {collapsed ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 text-white z-40 transition-transform duration-300
        ${collapsed ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 w-64`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-indigo-400">MediHub</h1>
          <p className="text-xs text-slate-400 mt-1">Admin Panel</p>
        </div>

        {/* Admin info */}
        <div className="px-6 py-4 border-b border-slate-700">
          <p className="text-sm font-medium truncate">{admin.firstName} {admin.lastName}</p>
          <p className="text-xs text-slate-400 truncate">{admin.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setCollapsed(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors
                  ${isActive
                    ? "bg-indigo-600 text-white border-r-4 border-indigo-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-md transition-colors"
          >
            <RiLogoutBoxLine size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideNavbar;
