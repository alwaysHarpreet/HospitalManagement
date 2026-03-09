import { useState, useEffect } from "react";
import axios from "../axios/axios.jsx";
import { toast } from "react-toastify";
import { RiGroupLine, RiSearchLine, RiArrowLeftLine } from "react-icons/ri";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientRecord, setPatientRecord] = useState(null);

    useEffect(() => {
        axios.get("/user/doctor/my-patients", { withCredentials: true })
            .then(res => setPatients(res.data.data))
            .catch(() => toast.error("Failed to load patients"));
    }, []);

    const viewRecord = async (patientId) => {
        try {
            const res = await axios.get(`/user/doctor/patient/${patientId}`, { withCredentials: true });
            setPatientRecord(res.data.data);
            setSelectedPatient(patientId);
        } catch {
            toast.error("Failed to load patient record");
        }
    };

    const filtered = patients.filter(p =>
        `${p.firstName} ${p.lastName} ${p.email}`.toLowerCase().includes(search.toLowerCase())
    );

    const treatmentColor = (s) => {
        if (s === "Completed") return "bg-green-100 text-green-700";
        if (s === "In Progress") return "bg-blue-100 text-blue-700";
        if (s === "Follow Up") return "bg-purple-100 text-purple-700";
        return "bg-gray-100 text-gray-600";
    };

    if (selectedPatient && patientRecord) {
        const { patient, appointments } = patientRecord;
        return (
            <div>
                <button onClick={() => { setSelectedPatient(null); setPatientRecord(null); }}
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-4 font-medium">
                    <RiArrowLeftLine /> Back to Patients
                </button>

                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {patient.firstName} {patient.lastName}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="text-gray-500">Email:</span> <span className="font-medium">{patient.email}</span></div>
                        <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{patient.phone}</span></div>
                        <div><span className="text-gray-500">Gender:</span> <span className="font-medium">{patient.gender}</span></div>
                        <div><span className="text-gray-500">DOB:</span> <span className="font-medium">{new Date(patient.dob).toLocaleDateString()}</span></div>
                        <div><span className="text-gray-500">City:</span> <span className="font-medium">{patient.address?.city}</span></div>
                        <div><span className="text-gray-500">Country:</span> <span className="font-medium">{patient.address?.country}</span></div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mb-3">Appointment History ({appointments.length})</h3>
                <div className="space-y-4">
                    {appointments.map(apt => (
                        <div key={apt._id} className="bg-white rounded-xl shadow p-5">
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold text-gray-800">
                                    {new Date(apt.appointmentDate).toLocaleDateString()} — {apt.department}
                                </p>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${apt.status === "Accepted" ? "bg-green-100 text-green-700" : apt.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                                        {apt.status}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${treatmentColor(apt.treatmentStatus)}`}>
                                        {apt.treatmentStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                {apt.diagnosis && (
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500 text-xs mb-1">Diagnosis</p>
                                        <p className="text-gray-800">{apt.diagnosis}</p>
                                    </div>
                                )}
                                {apt.prescription && (
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500 text-xs mb-1">Prescription</p>
                                        <p className="text-gray-800">{apt.prescription}</p>
                                    </div>
                                )}
                                {apt.medicalNotes && (
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500 text-xs mb-1">Medical Notes</p>
                                        <p className="text-gray-800">{apt.medicalNotes}</p>
                                    </div>
                                )}
                                {apt.labTests?.length > 0 && (
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500 text-xs mb-1">Lab Tests</p>
                                        <div className="flex flex-wrap gap-1">
                                            {apt.labTests.map((t, i) => (
                                                <span key={i} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {appointments.length === 0 && (
                        <p className="text-center text-gray-400 py-8">No appointment history</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <RiGroupLine className="text-teal-600" /> My Patients
                </h1>
                <div className="relative">
                    <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
                    <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(p => (
                    <div key={p._id} className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition cursor-pointer" onClick={() => viewRecord(p._id)}>
                        <h3 className="font-semibold text-gray-800">{p.firstName} {p.lastName}</h3>
                        <p className="text-sm text-gray-500">{p.email}</p>
                        <div className="flex justify-between mt-3 text-xs text-gray-400">
                            <span>{p.gender}</span>
                            <span>{p.phone}</span>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p className="col-span-full text-center text-gray-400 py-8">No patients found</p>
                )}
            </div>
        </div>
    );
};

export default Patients;
