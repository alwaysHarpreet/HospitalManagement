import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Context/Context.jsx";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import {
    RiDashboardLine, RiCalendarLine, RiGroupLine, RiLogoutBoxLine,
    RiMenuLine, RiCloseLine, RiStethoscopeLine
} from "react-icons/ri";

const navItems = [
    { path: "/", label: "Dashboard", icon: RiDashboardLine },
    { path: "/appointments", label: "Appointments", icon: RiCalendarLine },
    { path: "/patients", label: "My Patients", icon: RiGroupLine },
];

const SideNavbar = () => {
    const { doctor, setIsAuthenticated, setDoctor } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get("/user/doctor/logout", { withCredentials: true });
            setIsAuthenticated(false);
            setDoctor({});
            toast.success("Logged out");
            navigate("/login");
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    return (
        <>
            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)}
                className="md:hidden fixed top-4 left-4 z-50 bg-teal-600 text-white p-2 rounded-lg">
                {open ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transition-transform
                ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <div className="p-6 border-b">
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-100 p-2 rounded-full">
                            <RiStethoscopeLine className="text-2xl text-teal-600" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">Dr. {doctor?.firstName} {doctor?.lastName}</p>
                            <p className="text-xs text-gray-500">{doctor?.department?.name}</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map(item => (
                        <Link key={item.path} to={item.path} onClick={() => setOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                                ${location.pathname === item.path
                                    ? "bg-teal-50 text-teal-700 font-semibold"
                                    : "text-gray-600 hover:bg-gray-50"}`}>
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-0 w-full px-4">
                    <button onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition">
                        <RiLogoutBoxLine size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default SideNavbar;
