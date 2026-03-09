import React, { useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const categoryOptions = ["Tablet", "Syrup", "Injection", "Drops", "Cream", "Powder", "Lotion", "Inhaler"];

function AddMedicine() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    manufacturer: "",
    expiryDate: "",
    stock: "",
    discount: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("/medicines/addmedicine", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || "Medicine added successfully");
      navigate("/medicines");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add medicine");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="md:ml-64 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Medicine</h1>
        <p className="text-gray-500 mt-1">Add medicine to the inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className={labelClass}>Medicine Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Paracetamol" />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} required className={inputClass}>
              <option value="">Select Category</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Price (₹)</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required className={inputClass} placeholder="100" />
          </div>
          <div>
            <label className={labelClass}>Stock</label>
            <input name="stock" type="number" value={form.stock} onChange={handleChange} required className={inputClass} placeholder="500" />
          </div>
          <div>
            <label className={labelClass}>Discount (%)</label>
            <input name="discount" type="number" value={form.discount} onChange={handleChange} required className={inputClass} placeholder="10" />
          </div>
          <div>
            <label className={labelClass}>Manufacturer</label>
            <input name="manufacturer" value={form.manufacturer} onChange={handleChange} required className={inputClass} placeholder="Sun Pharma" />
          </div>
          <div>
            <label className={labelClass}>Expiry Date</label>
            <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required className={inputClass} />
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className={inputClass}
            placeholder="Medicine description (min 10 chars)"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add Medicine"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/medicines")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMedicine;
