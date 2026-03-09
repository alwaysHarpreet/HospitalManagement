import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import {
  RiStethoscopeLine,
  RiUserLine,
  RiCalendarCheckLine,
  RiBuilding2Line,
  RiMedicineBottleLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

function Reports() {
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("/user/admin/dashboard-stats", { withCredentials: true }),
      axios.get("/user/alldoctors", { withCredentials: true }),
    ])
      .then(([statsRes, docsRes]) => {
        setStats(statsRes.data.data);
        setDoctors(docsRes.data.data);
      })
      .catch(() => toast.error("Failed to load reports"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="md:ml-64 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Department breakdown
  const deptCount = {};
  doctors.forEach((doc) => {
    const dept = doc.department?.name || "Unassigned";
    deptCount[dept] = (deptCount[dept] || 0) + 1;
  });

  // Category breakdown for medicines would need another call, using stats
  const appointmentTotal = stats?.totalAppointments || 0;
  const pendingPct = appointmentTotal ? Math.round((stats.pendingAppointments / appointmentTotal) * 100) : 0;
  const acceptedPct = appointmentTotal ? Math.round((stats.acceptedAppointments / appointmentTotal) * 100) : 0;
  const rejectedPct = appointmentTotal ? Math.round((stats.rejectedAppointments / appointmentTotal) * 100) : 0;

  const summaryCards = [
    { label: "Total Doctors", value: stats?.totalDoctors || 0, icon: RiStethoscopeLine, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Patients", value: stats?.totalPatients || 0, icon: RiUserLine, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Appointments", value: stats?.totalAppointments || 0, icon: RiCalendarCheckLine, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Departments", value: stats?.totalDepartments || 0, icon: RiBuilding2Line, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Total Medicines", value: stats?.totalMedicines || 0, icon: RiMedicineBottleLine, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Total Payments", value: stats?.totalPayments || 0, icon: RiMoneyDollarCircleLine, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1">Hospital overview and key metrics</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className={`${card.bg} rounded-xl p-5 flex items-center gap-4`}>
            <card.icon className={card.color} size={32} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appointment Status Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Status Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Pending</span>
                <span className="font-medium">{stats?.pendingAppointments || 0} ({pendingPct}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-amber-500 h-3 rounded-full transition-all" style={{ width: `${pendingPct}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Accepted</span>
                <span className="font-medium">{stats?.acceptedAppointments || 0} ({acceptedPct}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${acceptedPct}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Rejected</span>
                <span className="font-medium">{stats?.rejectedAppointments || 0} ({rejectedPct}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full transition-all" style={{ width: `${rejectedPct}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors by Department */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Doctors by Department</h2>
          {Object.keys(deptCount).length === 0 ? (
            <p className="text-gray-500 text-sm">No department data available</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(deptCount)
                .sort((a, b) => b[1] - a[1])
                .map(([dept, count]) => (
                  <div key={dept} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{dept}</span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
