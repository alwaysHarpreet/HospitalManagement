import { useState, useEffect, useContext } from "react";
import axios from "../axios/axios.jsx";
import { Context } from "../Context/Context.jsx";
import {
    RiCalendarLine, RiGroupLine, RiTimeLine,
    RiCheckboxCircleLine, RiLoader4Line, RiArrowGoBackLine
} from "react-icons/ri";

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="text-2xl text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const Home = () => {
    const { doctor } = useContext(Context);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axios.get("/user/doctor/dashboard-stats", { withCredentials: true })
            .then(res => setStats(res.data.data))
            .catch(() => {});
    }, []);

    if (!stats) return <div className="flex justify-center items-center h-64"><RiLoader4Line className="animate-spin text-4xl text-teal-600" /></div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome, Dr. {doctor?.firstName}!</h1>
            <p className="text-gray-500 mb-6">{doctor?.department?.name} Department</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard icon={RiCalendarLine} label="Total Appointments" value={stats.totalAppointments} color="bg-teal-500" />
                <StatCard icon={RiGroupLine} label="Total Patients" value={stats.totalPatients} color="bg-blue-500" />
                <StatCard icon={RiTimeLine} label="Today's Appointments" value={stats.todayAppointments} color="bg-orange-500" />
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mb-4">Appointment Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                    <p className="text-sm text-yellow-700">Pending</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
                    <p className="text-sm text-green-700">Accepted</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                    <p className="text-sm text-red-700">Rejected</p>
                </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mb-4">Treatment Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center flex flex-col items-center gap-1">
                    <RiLoader4Line className="text-2xl text-blue-600" />
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                    <p className="text-sm text-blue-700">In Progress</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center flex flex-col items-center gap-1">
                    <RiCheckboxCircleLine className="text-2xl text-green-600" />
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                    <p className="text-sm text-green-700">Completed</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center flex flex-col items-center gap-1">
                    <RiArrowGoBackLine className="text-2xl text-purple-600" />
                    <p className="text-2xl font-bold text-purple-600">{stats.followUp}</p>
                    <p className="text-sm text-purple-700">Follow Up</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
