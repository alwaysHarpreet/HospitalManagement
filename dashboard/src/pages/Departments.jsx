import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";

function Departments() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user/alldoctors", { withCredentials: true })
      .then((res) => setDoctors(res.data.data))
      .catch(() => toast.error("Failed to fetch departments"))
      .finally(() => setLoading(false));
  }, []);

  // Group doctors by department
  const departments = {};
  doctors.forEach((doc) => {
    const deptName = doc.department?.name || "Unassigned";
    if (!departments[deptName]) {
      departments[deptName] = {
        name: deptName,
        description: doc.department?.description || "",
        doctors: [],
      };
    }
    departments[deptName].doctors.push(doc);
  });

  const deptList = Object.values(departments);

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
        <p className="text-gray-500 mt-1">Hospital departments overview ({deptList.length} departments)</p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      ) : deptList.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No departments found. Add doctors to create departments.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deptList.map((dept) => (
            <div key={dept.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{dept.name}</h3>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {dept.doctors.length} Doctor{dept.doctors.length !== 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{dept.description}</p>
              <div className="space-y-3">
                {dept.doctors.map((doc) => (
                  <div key={doc._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={doc.docAvatar}
                      alt={doc.firstName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Dr. {doc.firstName} {doc.lastName}</p>
                      <p className="text-xs text-gray-500">{doc.experience} experience</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Departments;
