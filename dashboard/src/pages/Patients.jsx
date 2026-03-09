import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user/admin/all-patients", { withCredentials: true })
      .then((res) => setPatients(res.data.data))
      .catch(() => toast.error("Failed to fetch patients"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        <p className="text-gray-500 mt-1">All registered patients ({patients.length})</p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No patients registered yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">#</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Phone</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Gender</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">City</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {patients.map((p, idx) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{p.firstName} {p.lastName}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.gender}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.address?.city || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(p.createdAt).toLocaleDateString()}
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

export default Patients;
