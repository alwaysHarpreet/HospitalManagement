import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";

function MyAppointments() {
  const { isAuthenticated } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/patient/my-appointments", {
        withCredentials: true,
      });
      setAppointments(res.data.data);
    } catch (error) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/user/patient/cancel-appointment/${id}`, {
        withCredentials: true,
      });
      toast.success("Appointment cancelled");
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted": return "patient-page__status--accepted";
      case "Rejected": return "patient-page__status--rejected";
      default: return "patient-page__status--pending";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="patient-page">
        <div className="patient-page__container">
          <h2 className="patient-page__title">Please login to view appointments</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-page">
      <div className="patient-page__container">
        <div className="patient-page__header">
          <h1 className="patient-page__title">My Appointments</h1>
          <Link to="/book-appointment" className="patient-page__btn">Book New Appointment</Link>
        </div>

        {loading ? (
          <p className="patient-page__loading">Loading...</p>
        ) : appointments.length === 0 ? (
          <div className="patient-page__empty">
            <p>No appointments found.</p>
            <Link to="/book-appointment" className="patient-page__btn">Book Your First Appointment</Link>
          </div>
        ) : (
          <div className="patient-page__table-wrap">
            <table className="patient-page__table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt._id}>
                    <td>Dr. {apt.doctorFirstName} {apt.doctorLastName}</td>
                    <td>{apt.department}</td>
                    <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                    <td>{apt.city}</td>
                    <td>
                      <span className={`patient-page__status ${getStatusClass(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      {apt.status === "Pending" && (
                        <button
                          className="patient-page__btn patient-page__btn--danger"
                          onClick={() => handleCancel(apt._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
