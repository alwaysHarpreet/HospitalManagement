import React, { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";

function Billing() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/user/admin/all-payments", { withCredentials: true })
      .then((res) => setPayments(res.data.data))
      .catch(() => toast.error("Failed to fetch payments"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Billing</h1>
        <p className="text-gray-500 mt-1">Payment records ({payments.length} transactions)</p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : payments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">No payment records found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">#</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Payment ID</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p, idx) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-mono">{p.razorpay_order_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-mono">{p.razorpay_payment_id}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        Verified
                      </span>
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

export default Billing;
