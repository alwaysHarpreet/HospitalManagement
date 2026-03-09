import { useEffect, useState } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const statusBadge = (status) => {
    const colors = {
        Pending: "bg-yellow-100 text-yellow-700",
        "In Progress": "bg-blue-100 text-blue-700",
        Completed: "bg-emerald-100 text-emerald-700",
        "Not Started": "bg-gray-100 text-gray-600",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[status] || colors["Not Started"]}`}>
            {status || "Not Started"}
        </span>
    );
};

const TestRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchRequests = async () => {
        try {
            const { data } = await axios.get("/labtech/test-requests", { withCredentials: true });
            setRequests(data.testRequests || []);
        } catch (err) {
            toast.error("Failed to load test requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRequests(); }, []);

    const handleClaim = async (appointmentId, testName) => {
        try {
            await axios.post("/labtech/claim-test", { appointmentId, testName }, { withCredentials: true });
            toast.success("Test claimed successfully");
            fetchRequests();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to claim test");
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Test Requests</h1>

            {requests.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border">
                    <p className="text-gray-500">No pending test requests found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left">Patient</th>
                                    <th className="px-4 py-3 text-left">Doctor</th>
                                    <th className="px-4 py-3 text-left">Test Name</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {requests.map((req, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{req.patientName}</td>
                                        <td className="px-4 py-3">{req.doctorName}</td>
                                        <td className="px-4 py-3 font-medium">{req.testName}</td>
                                        <td className="px-4 py-3">{statusBadge(req.status)}</td>
                                        <td className="px-4 py-3">
                                            {!req.status || req.status === "Not Started" ? (
                                                <button onClick={() => handleClaim(req.appointmentId, req.testName)}
                                                    className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 transition">
                                                    Claim
                                                </button>
                                            ) : req.status !== "Completed" ? (
                                                <button onClick={() => navigate("/upload-report", {
                                                    state: { reportId: req.reportId, appointmentId: req.appointmentId, testName: req.testName }
                                                })}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition">
                                                    Upload <RiArrowRightLine />
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-xs">Done</span>
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

export default TestRequests;
