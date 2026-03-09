import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiUploadCloud2Line } from "react-icons/ri";

const UploadReport = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const prefill = location.state || {};

    const [form, setForm] = useState({
        appointmentId: prefill.appointmentId || "",
        testName: prefill.testName || "",
        results: "",
        notes: "",
    });
    const [reportFile, setReportFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.appointmentId || !form.testName) {
            toast.error("Appointment ID and Test Name are required");
            return;
        }
        setLoading(true);
        try {
            const fd = new FormData();
            fd.append("appointmentId", form.appointmentId);
            fd.append("testName", form.testName);
            fd.append("results", form.results);
            fd.append("notes", form.notes);
            if (reportFile) fd.append("reportFile", reportFile);

            await axios.post("/labtech/upload-report", fd, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Report uploaded successfully");
            navigate("/records");
        } catch (err) {
            toast.error(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Lab Report</h1>

            <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment ID</label>
                            <input type="text" name="appointmentId" required
                                value={form.appointmentId} onChange={handleChange}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="Enter Appointment ID" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                            <input type="text" name="testName" required
                                value={form.testName} onChange={handleChange}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="e.g., Complete Blood Count" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Results</label>
                        <textarea name="results" rows={4}
                            value={form.results} onChange={handleChange}
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                            placeholder="Enter test results..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea name="notes" rows={2}
                            value={form.notes} onChange={handleChange}
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                            placeholder="Additional notes..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Report File (optional)</label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-emerald-400 transition cursor-pointer"
                            onClick={() => document.getElementById("reportFileInput").click()}>
                            <RiUploadCloud2Line className="mx-auto text-3xl text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                                {reportFile ? reportFile.name : "Click to upload PDF, image, or document"}
                            </p>
                            <input id="reportFileInput" type="file" className="hidden"
                                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                                onChange={(e) => setReportFile(e.target.files[0])} />
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 font-medium">
                        {loading ? "Uploading..." : "Upload Report"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadReport;
