import { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiDownload2Line } from "react-icons/ri";

const statusOptions = ["Pending", "In Progress", "Completed"];

const statusBadge = (status) => {
    const colors = {
        Pending: "bg-yellow-100 text-yellow-700",
        "In Progress": "bg-blue-100 text-blue-700",
        Completed: "bg-emerald-100 text-emerald-700",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
};

const LabRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecords = async () => {
        try {
            const { data } = await axios.get("/labtech/records", { withCredentials: true });
            setRecords(data.reports || []);
        } catch (err) {
            toast.error("Failed to load records");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRecords(); }, []);

    const handleStatusUpdate = async (reportId, newStatus) => {
        try {
            await axios.put(`/labtech/update-status/${reportId}`, { status: newStatus }, { withCredentials: true });
            toast.success("Status updated");
            fetchRecords();
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Lab Records</h1>

            {records.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border">
                    <p className="text-gray-500">No lab records found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left">Patient</th>
                                    <th className="px-4 py-3 text-left">Doctor</th>
                                    <th className="px-4 py-3 text-left">Test</th>
                                    <th className="px-4 py-3 text-left">Results</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Update</th>
                                    <th className="px-4 py-3 text-left">File</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {records.map(rec => (
                                    <tr key={rec._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{rec.patientFirstName} {rec.patientLastName}</td>
                                        <td className="px-4 py-3">{rec.doctorFirstName} {rec.doctorLastName}</td>
                                        <td className="px-4 py-3 font-medium">{rec.testName}</td>
                                        <td className="px-4 py-3 max-w-[200px] truncate" title={rec.results}>
                                            {rec.results || "—"}
                                        </td>
                                        <td className="px-4 py-3">{statusBadge(rec.status)}</td>
                                        <td className="px-4 py-3">
                                            {rec.status !== "Completed" ? (
                                                <select value={rec.status}
                                                    onChange={(e) => handleStatusUpdate(rec._id, e.target.value)}
                                                    className="px-2 py-1 border rounded text-xs focus:ring-2 focus:ring-emerald-500 outline-none">
                                                    {statusOptions.map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="text-gray-400 text-xs">Final</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {rec.reportFileUrl ? (
                                                <a href={rec.reportFileUrl} target="_blank" rel="noopener noreferrer"
                                                    className="text-emerald-600 hover:text-emerald-800">
                                                    <RiDownload2Line size={18} />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-xs">—</span>
                                            )}
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
};

export default LabRecords;
