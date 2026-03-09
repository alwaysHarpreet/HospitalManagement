import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context.jsx";
import axios from "../axios/axios.jsx";
import {
  RiStethoscopeLine,
  RiUserLine,
  RiCalendarCheckLine,
  RiBuilding2Line,
  RiTeamLine,
  RiMedicineBottleLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

function Home() {
  const { admin } = useContext(Context);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user/admin/dashboard-stats", { withCredentials: true })
      .then((res) => setStats(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="md:ml-64 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Doctors", value: stats?.totalDoctors || 0, icon: RiStethoscopeLine, color: "bg-blue-500" },
    { label: "Patients", value: stats?.totalPatients || 0, icon: RiUserLine, color: "bg-green-500" },
    { label: "Appointments", value: stats?.totalAppointments || 0, icon: RiCalendarCheckLine, color: "bg-purple-500" },
    { label: "Departments", value: stats?.totalDepartments || 0, icon: RiBuilding2Line, color: "bg-orange-500" },
    { label: "Staff", value: stats?.totalAdmins || 0, icon: RiTeamLine, color: "bg-cyan-500" },
    { label: "Medicines", value: stats?.totalMedicines || 0, icon: RiMedicineBottleLine, color: "bg-pink-500" },
    { label: "Payments", value: stats?.totalPayments || 0, icon: RiMoneyDollarCircleLine, color: "bg-yellow-500" },
  ];

  const appointmentCards = [
    { label: "Pending", value: stats?.pendingAppointments || 0, icon: RiTimeLine, color: "bg-amber-500" },
    { label: "Accepted", value: stats?.acceptedAppointments || 0, icon: RiCheckLine, color: "bg-emerald-500" },
    { label: "Rejected", value: stats?.rejectedAppointments || 0, icon: RiCloseLine, color: "bg-red-500" },
  ];

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, <span className="font-semibold text-indigo-600">{admin.firstName} {admin.lastName}</span>
        </p>
      </div>

      {/* Main stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment breakdown */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Appointment Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {appointmentCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Departments list */}
      {stats?.departments?.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Active Departments</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap gap-3">
              {stats.departments.map((dept) => (
                <span key={dept} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                  {dept}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;