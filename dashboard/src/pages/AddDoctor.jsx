import React, { useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const departmentOptions = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Medicine",
  "Neurology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Surgery",
  "Urology",
];

function AddDoctor() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    department: "",
    departmentDesc: "",
    specializations: "",
    specializationsDesc: "",
    qualifications: "",
    experience: "",
    days: "",
    hours: "",
    languagesKnown: "",
    appointmentCharges: "",
    country: "",
    city: "",
    pincode: "",
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    formData.append("gender", form.gender);
    formData.append("experience", form.experience);
    formData.append("appointmentCharges", form.appointmentCharges);

    // Nested objects as JSON strings
    formData.append("department", JSON.stringify({
      name: form.department,
      description: form.departmentDesc,
    }));
    formData.append("address", JSON.stringify({
      country: form.country,
      city: form.city,
      pincode: form.pincode,
    }));
    formData.append("specializations", JSON.stringify(
      form.specializations.split(",").map((s) => ({
        name: s.trim(),
        description: form.specializationsDesc,
      }))
    ));
    formData.append("qualifications", JSON.stringify(
      form.qualifications.split(",").map((q) => q.trim())
    ));
    formData.append("availabelSlots", JSON.stringify({
      days: form.days.split(",").map((d) => d.trim()),
      hours: form.hours,
    }));
    formData.append("languagesKnown", JSON.stringify(
      form.languagesKnown.split(",").map((l) => l.trim())
    ));

    if (avatar) {
      formData.append("docAvatar", avatar);
    }

    try {
      const res = await axios.post("/user/doctor/addnew", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || "Doctor added successfully");
      navigate("/doctors");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add doctor");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Doctor</h1>
        <p className="text-gray-500 mt-1">Fill in the details to register a new doctor</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Personal Info */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
            <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="doctor@example.com" />
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
        </div>

        {/* Address */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className={labelClass}>Country</label>
            <input name="country" value={form.country} onChange={handleChange} required className={inputClass} placeholder="India" />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input name="city" value={form.city} onChange={handleChange} required className={inputClass} placeholder="Hyderabad" />
          </div>
          <div>
            <label className={labelClass}>Pincode</label>
            <input name="pincode" value={form.pincode} onChange={handleChange} required className={inputClass} placeholder="500001" />
          </div>
        </div>

        {/* Professional Info */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className={labelClass}>Department</label>
            <select name="department" value={form.department} onChange={handleChange} required className={inputClass}>
              <option value="">Select Department</option>
              {departmentOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Department Description</label>
            <input name="departmentDesc" value={form.departmentDesc} onChange={handleChange} required className={inputClass} placeholder="Brief description" />
          </div>
          <div>
            <label className={labelClass}>Specializations (comma-separated)</label>
            <input name="specializations" value={form.specializations} onChange={handleChange} required className={inputClass} placeholder="Heart Surgery, Angioplasty" />
          </div>
          <div>
            <label className={labelClass}>Specializations Description</label>
            <input name="specializationsDesc" value={form.specializationsDesc} onChange={handleChange} required className={inputClass} placeholder="Brief description" />
          </div>
          <div>
            <label className={labelClass}>Qualifications (comma-separated)</label>
            <input name="qualifications" value={form.qualifications} onChange={handleChange} required className={inputClass} placeholder="MBBS, MD" />
          </div>
          <div>
            <label className={labelClass}>Experience</label>
            <input name="experience" value={form.experience} onChange={handleChange} required className={inputClass} placeholder="5 years" />
          </div>
          <div>
            <label className={labelClass}>Available Days (comma-separated)</label>
            <input name="days" value={form.days} onChange={handleChange} required className={inputClass} placeholder="Monday, Wednesday, Friday" />
          </div>
          <div>
            <label className={labelClass}>Available Hours</label>
            <input name="hours" value={form.hours} onChange={handleChange} required className={inputClass} placeholder="9:00 AM - 5:00 PM" />
          </div>
          <div>
            <label className={labelClass}>Languages Known (comma-separated)</label>
            <input name="languagesKnown" value={form.languagesKnown} onChange={handleChange} required className={inputClass} placeholder="English, Hindi, Telugu" />
          </div>
          <div>
            <label className={labelClass}>Appointment Charges (₹)</label>
            <input name="appointmentCharges" value={form.appointmentCharges} onChange={handleChange} required className={inputClass} placeholder="500" />
          </div>
        </div>

        {/* Avatar */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Doctor Photo</h2>
        <div className="mb-6">
          <label className={labelClass}>Upload Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            required
            className={inputClass}
          />
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add Doctor"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;
