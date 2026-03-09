import { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiFileList3Line, RiTimeLine, RiLoader4Line, RiCheckDoubleLine, RiTestTubeLine } from "react-icons/ri";

const statCards = [
    { key: "totalReports", label: "Total Reports", icon: RiFileList3Line, color: "bg-blue-500" },
    { key: "pending", label: "Pending", icon: RiTimeLine, color: "bg-yellow-500" },
    { key: "inProgress", label: "In Progress", icon: RiLoader4Line, color: "bg-orange-500" },
    { key: "completed", label: "Completed", icon: RiCheckDoubleLine, color: "bg-emerald-500" },
    { key: "pendingTests", label: "Unclaimed Tests", icon: RiTestTubeLine, color: "bg-red-500" },
];

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get("/labtech/dashboard-stats", { withCredentials: true });
                setStats(data.stats);
            } catch (err) {
                toast.error("Failed to load stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {statCards.map(card => (
                    <div key={card.key} className="bg-white rounded-xl shadow-sm p-5 border">
                        <div className="flex items-center gap-4">
                            <div className={`${card.color} p-3 rounded-lg text-white`}>
                                <card.icon size={24} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{stats[card.key] ?? 0}</p>
                                <p className="text-sm text-gray-500">{card.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <a href="/test-requests"
                        className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition font-medium text-sm">
                        View Test Requests
                    </a>
                    <a href="/upload-report"
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-sm">
                        Upload Report
                    </a>
                    <a href="/records"
                        className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium text-sm">
                        View Records
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
