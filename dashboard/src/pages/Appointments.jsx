import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";

const statusColors = {
  Pending: "bg-amber-100 text-amber-700",
  Accepted: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    setLoading(true);
    axios
      .get("/user/admin/all-appointments", { withCredentials: true })
      .then((res) => setAppointments(res.data.data))
      .catch(() => toast.error("Failed to fetch appointments"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`/user/admin/appointment/update/${id}`, { status }, { withCredentials: true });
      toast.success(`Appointment ${status.toLowerCase()}`);
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await axios.delete(`/user/admin/appointment/delete/${id}`, { withCredentials: true });
      toast.success("Appointment deleted");
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete appointment");
    }
  };

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-500 mt-1">Manage all appointments ({appointments.length})</p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No appointments found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Doctor</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Department</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">City</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 text-sm">{apt.patientFirstName} {apt.patientLastName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">Dr. {apt.doctorFirstName} {apt.doctorLastName}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(apt.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.city}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[apt.status]}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {apt.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(apt._id, "Accepted")}
                              className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(apt._id, "Rejected")}
                              className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(apt._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <RiDeleteBinLine size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
