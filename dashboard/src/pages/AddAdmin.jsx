import React, { useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        address: { city: form.city, country: form.country },
      };
      const res = await axios.post("/user/admin/addnew", payload, { withCredentials: true });
      toast.success(res.data.message || "Admin added successfully");
      navigate("/staff");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add admin");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Admin</h1>
        <p className="text-gray-500 mt-1">Create a new admin staff account</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className={labelClass}>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required className={inputClass} placeholder="John" />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required className={inputClass} placeholder="Doe" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="admin@example.com" />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="9876543210" maxLength={10} />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className={inputClass} placeholder="Min 8 characters" />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} required className={inputClass}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input name="dob" type="date" value={form.dob} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="Hyderabad" />
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <input name="country" value={form.country} onChange={handleChange} className={inputClass} placeholder="India" />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add Admin"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/staff")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
