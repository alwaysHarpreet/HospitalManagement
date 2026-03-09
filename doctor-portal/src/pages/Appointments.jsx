import { useState, useEffect } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiCalendarLine, RiSearchLine } from "react-icons/ri";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);
    const [formData, setFormData] = useState({
        diagnosis: "", prescription: "", medicalNotes: "", labTests: "", treatmentStatus: "", status: ""
    });

    const fetchAppointments = () => {
        axios.get("/user/doctor/my-appointments", { withCredentials: true })
            .then(res => setAppointments(res.data.data))
            .catch(() => toast.error("Failed to load appointments"));
    };

    useEffect(() => { fetchAppointments(); }, []);

    const openDetails = (apt) => {
        setSelected(apt);
        setFormData({
            diagnosis: apt.diagnosis || "",
            prescription: apt.prescription || "",
            medicalNotes: apt.medicalNotes || "",
            labTests: (apt.labTests || []).join(", "),
            treatmentStatus: apt.treatmentStatus || "Not Started",
            status: apt.status || "Pending",
        });
    };

    const handleSave = async (field) => {
        try {
            let url = `/user/doctor/appointment/${selected._id}`;
            let body = {};
            if (field === "diagnosis") { url += "/diagnosis"; body = { diagnosis: formData.diagnosis }; }
            else if (field === "prescription") { url += "/prescription"; body = { prescription: formData.prescription }; }
            else if (field === "medicalNotes") { url += "/medical-notes"; body = { medicalNotes: formData.medicalNotes }; }
            else if (field === "labTests") {
                url += "/lab-tests";
                body = { labTests: formData.labTests.split(",").map(s => s.trim()).filter(Boolean) };
            }
            else if (field === "treatmentStatus") { url += "/treatment-status"; body = { treatmentStatus: formData.treatmentStatus }; }
            else if (field === "status") { url += "/status"; body = { status: formData.status }; }

            const res = await axios.put(url, body, { withCredentials: true });
            toast.success(res.data.message);
            fetchAppointments();
            setSelected(res.data.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to save");
        }
    };

    const filtered = appointments.filter(a =>
        `${a.patientFirstName} ${a.patientLastName}`.toLowerCase().includes(search.toLowerCase()) ||
        a.department?.toLowerCase().includes(search.toLowerCase())
    );

    const statusColor = (s) => {
        if (s === "Accepted") return "bg-green-100 text-green-700";
        if (s === "Rejected") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    const treatmentColor = (s) => {
        if (s === "Completed") return "bg-green-100 text-green-700";
        if (s === "In Progress") return "bg-blue-100 text-blue-700";
        if (s === "Follow Up") return "bg-purple-100 text-purple-700";
        return "bg-gray-100 text-gray-600";
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <RiCalendarLine className="text-teal-600" /> Appointments
                </h1>
                <div className="relative">
                    <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-600">Patient</th>
                            <th className="px-4 py-3 text-left text-gray-600">Date</th>
                            <th className="px-4 py-3 text-left text-gray-600">Department</th>
                            <th className="px-4 py-3 text-left text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left text-gray-600">Treatment</th>
                            <th className="px-4 py-3 text-left text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filtered.map(apt => (
                            <tr key={apt._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{apt.patientFirstName} {apt.patientLastName}</td>
                                <td className="px-4 py-3">{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                                <td className="px-4 py-3">{apt.department}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(apt.status)}`}>{apt.status}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${treatmentColor(apt.treatmentStatus)}`}>{apt.treatmentStatus}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <button onClick={() => openDetails(apt)}
                                        className="text-teal-600 hover:text-teal-800 font-medium text-sm">View / Edit</button>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No appointments found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Detail / Edit Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {selected.patientFirstName} {selected.patientLastName}
                            </h2>
                            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                            <p><span className="text-gray-500">Date:</span> {new Date(selected.appointmentDate).toLocaleDateString()}</p>
                            <p><span className="text-gray-500">City:</span> {selected.city}</p>
                            <p><span className="text-gray-500">Pincode:</span> {selected.pincode}</p>
                            <p><span className="text-gray-500">Charges:</span> {selected.appointmentCharges}</p>
                        </div>

                        {/* Appointment Status */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment Status</label>
                            <div className="flex gap-2">
                                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400">
                                    <option value="Pending">Pending</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <button onClick={() => handleSave("status")} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Save</button>
                            </div>
                        </div>

                        {/* Diagnosis */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Diagnosis</label>
                            <div className="flex gap-2">
                                <textarea rows={2} value={formData.diagnosis} onChange={e => setFormData({ ...formData, diagnosis: e.target.value })}
                                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="Enter diagnosis..." />
                                <button onClick={() => handleSave("diagnosis")} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 self-end">Save</button>
                            </div>
                        </div>

                        {/* Prescription */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Prescription</label>
                            <div className="flex gap-2">
                                <textarea rows={2} value={formData.prescription} onChange={e => setFormData({ ...formData, prescription: e.target.value })}
                                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="Write prescription..." />
                                <button onClick={() => handleSave("prescription")} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 self-end">Save</button>
                            </div>
                        </div>

                        {/* Medical Notes */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Medical Notes</label>
                            <div className="flex gap-2">
                                <textarea rows={2} value={formData.medicalNotes} onChange={e => setFormData({ ...formData, medicalNotes: e.target.value })}
                                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="Upload medical notes..." />
                                <button onClick={() => handleSave("medicalNotes")} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 self-end">Save</button>
                            </div>
                        </div>

                        {/* Lab Tests */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Recommended Lab Tests</label>
                            <p className="text-xs text-gray-400 mb-1">Comma-separated (e.g., CBC, X-Ray, MRI)</p>
                            <div className="flex gap-2">
                                <input value={formData.labTests} onChange={e => setFormData({ ...formData, labTests: e.target.value })}
                                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="CBC, X-Ray, Blood Sugar..." />
                                <button onClick={() => handleSave("labTests")} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Save</button>
                            </div>
                            {selected.labTests?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {selected.labTests.map((t, i) => (
                                        <span key={i} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full">{t}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Treatment Status */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Treatment Status</label>
                            <div className="flex gap-2">
                                <select value={formData.treatmentStatus} onChange={e => setFormData({ ...formData, treatmentStatus: e.target.value })}
                                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400">
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Follow Up">Follow Up</option>
                                </select>
                                <button onClick={() => handleSave("treatmentStatus")} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
