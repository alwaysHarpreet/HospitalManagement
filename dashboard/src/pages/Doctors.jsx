import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiDeleteBinLine, RiAddLine } from "react-icons/ri";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = () => {
    setLoading(true);
    axios
      .get("/user/alldoctors", { withCredentials: true })
      .then((res) => setDoctors(res.data.data))
      .catch(() => toast.error("Failed to fetch doctors"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await axios.delete(`/user/admin/doctor/delete/${id}`, { withCredentials: true });
      toast.success("Doctor deleted successfully");
      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete doctor");
    }
  };

  return (
    <div className="md:ml-64 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Doctors</h1>
          <p className="text-gray-500 mt-1">Manage all registered doctors</p>
        </div>
        <Link
          to="/doctors/add"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RiAddLine size={18} /> Add Doctor
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No doctors registered yet</p>
          <Link to="/doctors/add" className="text-indigo-600 hover:underline mt-2 inline-block">
            Add the first doctor
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Doctor</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Department</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Phone</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Experience</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Charges</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doctors.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.docAvatar}
                          alt={doc.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">Dr. {doc.firstName} {doc.lastName}</p>
                          <p className="text-xs text-gray-500">{doc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.department?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.experience}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">₹{doc.appointmentCharges}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Doctor"
                      >
                        <RiDeleteBinLine size={18} />
                      </button>
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

export default Doctors;
