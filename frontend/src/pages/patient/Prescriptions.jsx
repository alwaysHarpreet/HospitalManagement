import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";

function Prescriptions() {
  const { isAuthenticated } = useContext(Context);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/patient/my-prescriptions", {
        withCredentials: true,
      });
      setPrescriptions(res.data.data);
    } catch (error) {
      toast.error("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (prescription) => {
    const content = `
MEDICAL REPORT
==============
Date: ${new Date(prescription.appointmentDate).toLocaleDateString()}
Doctor: Dr. ${prescription.doctorFirstName} ${prescription.doctorLastName}
Department: ${prescription.department}
Patient: ${prescription.patientFirstName} ${prescription.patientLastName}

DIAGNOSIS
---------
${prescription.diagnosis || "N/A"}

PRESCRIPTION
------------
${prescription.prescription || "N/A"}

MEDICAL NOTES
-------------
${prescription.medicalNotes || "N/A"}

LAB TESTS
---------
${prescription.labTests?.length > 0 ? prescription.labTests.join("\n") : "None"}

TREATMENT STATUS: ${prescription.treatmentStatus || "N/A"}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medical-report-${new Date(prescription.appointmentDate).toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTreatmentClass = (status) => {
    switch (status) {
      case "Completed": return "patient-page__status--accepted";
      case "In Progress": return "patient-page__status--pending";
      case "Follow Up": return "patient-page__status--followup";
      default: return "";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="patient-page">
        <div className="patient-page__container">
          <h2 className="patient-page__title">Please login to view prescriptions</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-page">
      <div className="patient-page__container">
        <h1 className="patient-page__title">My Prescriptions & Reports</h1>

        {loading ? (
          <p className="patient-page__loading">Loading...</p>
        ) : prescriptions.length === 0 ? (
          <div className="patient-page__empty">
            <p>No prescriptions found yet.</p>
          </div>
        ) : (
          <>
            <div className="patient-page__table-wrap">
              <table className="patient-page__table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Treatment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p) => (
                    <tr key={p._id}>
                      <td>{new Date(p.appointmentDate).toLocaleDateString()}</td>
                      <td>Dr. {p.doctorFirstName} {p.doctorLastName}</td>
                      <td>{p.department}</td>
                      <td>
                        <span className={`patient-page__status ${getTreatmentClass(p.treatmentStatus)}`}>
                          {p.treatmentStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          className="patient-page__btn patient-page__btn--small"
                          onClick={() => setSelectedPrescription(p)}
                        >
                          View
                        </button>
                        <button
                          className="patient-page__btn patient-page__btn--small patient-page__btn--secondary"
                          onClick={() => handleDownload(p)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Prescription Detail Modal */}
            {selectedPrescription && (
              <div className="patient-page__modal-overlay" onClick={() => setSelectedPrescription(null)}>
                <div className="patient-page__modal" onClick={(e) => e.stopPropagation()}>
                  <div className="patient-page__modal-header">
                    <h2>Medical Report</h2>
                    <button className="patient-page__modal-close" onClick={() => setSelectedPrescription(null)}>&times;</button>
                  </div>
                  <div className="patient-page__modal-body">
                    <div className="patient-page__detail-row">
                      <strong>Date:</strong>
                      <span>{new Date(selectedPrescription.appointmentDate).toLocaleDateString()}</span>
                    </div>
                    <div className="patient-page__detail-row">
                      <strong>Doctor:</strong>
                      <span>Dr. {selectedPrescription.doctorFirstName} {selectedPrescription.doctorLastName}</span>
                    </div>
                    <div className="patient-page__detail-row">
                      <strong>Department:</strong>
                      <span>{selectedPrescription.department}</span>
                    </div>
                    {selectedPrescription.diagnosis && (
                      <div className="patient-page__detail-section">
                        <h3>Diagnosis</h3>
                        <p>{selectedPrescription.diagnosis}</p>
                      </div>
                    )}
                    {selectedPrescription.prescription && (
                      <div className="patient-page__detail-section">
                        <h3>Prescription</h3>
                        <p>{selectedPrescription.prescription}</p>
                      </div>
                    )}
                    {selectedPrescription.medicalNotes && (
                      <div className="patient-page__detail-section">
                        <h3>Medical Notes</h3>
                        <p>{selectedPrescription.medicalNotes}</p>
                      </div>
                    )}
                    {selectedPrescription.labTests?.length > 0 && (
                      <div className="patient-page__detail-section">
                        <h3>Lab Tests</h3>
                        <ul>
                          {selectedPrescription.labTests.map((test, i) => (
                            <li key={i}>{test}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="patient-page__detail-row">
                      <strong>Treatment Status:</strong>
                      <span className={`patient-page__status ${getTreatmentClass(selectedPrescription.treatmentStatus)}`}>
                        {selectedPrescription.treatmentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="patient-page__modal-footer">
                    <button className="patient-page__btn" onClick={() => handleDownload(selectedPrescription)}>
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Prescriptions;
