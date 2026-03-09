import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";

function Staff() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user/admin/all-admins", { withCredentials: true })
      .then((res) => setAdmins(res.data.data))
      .catch(() => toast.error("Failed to fetch staff"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="md:ml-64 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Staff</h1>
          <p className="text-gray-500 mt-1">Manage admin staff ({admins.length})</p>
        </div>
        <Link
          to="/staff/add"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RiAddLine size={18} /> Add Admin
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : admins.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No admin staff found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div key={admin._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-lg">
                    {admin.firstName?.[0]}{admin.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{admin.firstName} {admin.lastName}</p>
                  <p className="text-sm text-gray-500">{admin.email}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <p className="text-gray-700">{admin.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Gender</p>
                  <p className="text-gray-700">{admin.gender}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">City</p>
                  <p className="text-gray-700">{admin.address?.city || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Joined</p>
                  <p className="text-gray-700">{new Date(admin.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Staff;
