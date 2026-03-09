import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiDeleteBinLine, RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = () => {
    setLoading(true);
    axios
      .get("/user/admin/all-medicines", { withCredentials: true })
      .then((res) => setMedicines(res.data.data))
      .catch(() => toast.error("Failed to fetch medicines"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;
    try {
      await axios.delete(`/medicines/delete-medicine/${id}`, { withCredentials: true });
      toast.success("Medicine deleted successfully");
      fetchMedicines();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete medicine");
    }
  };

  return (
    <div className="md:ml-64 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Medicines</h1>
          <p className="text-gray-500 mt-1">Manage medicine inventory ({medicines.length})</p>
        </div>
        <Link
          to="/medicines/add"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RiAddLine size={18} /> Add Medicine
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : medicines.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No medicines in inventory</p>
          <Link to="/medicines/add" className="text-indigo-600 hover:underline mt-2 inline-block">
            Add the first medicine
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Medicine</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Discount</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Manufacturer</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Expiry</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {medicines.map((med) => (
                  <tr key={med._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={med.image} alt={med.name} className="w-10 h-10 rounded-lg object-cover" />
                        <p className="font-medium text-gray-800 text-sm">{med.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">{med.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">₹{med.price}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${med.stock < 10 ? "text-red-600" : "text-gray-600"}`}>
                        {med.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{med.discount}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{med.manufacturer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(med.expiryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(med._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <RiDeleteBinLine size={16} />
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

export default Medicines;
