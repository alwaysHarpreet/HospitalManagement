import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";

function BookAppointment() {
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    doctorId: "",
    department: "",
    city: "",
    pincode: "",
    appointmentDate: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/alldoctors", {
        withCredentials: true,
      });
      setDoctors(res.data.data);
    } catch (error) {
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-fill department when a doctor is selected
    if (name === "doctorId") {
      const doctor = doctors.find((d) => d._id === value);
      if (doctor) {
        setFormData((prev) => ({
          ...prev,
          doctorId: value,
          department: doctor.department?.name || "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/patient/book-appointment",
        formData,
        { withCredentials: true }
      );
      toast.success("Appointment booked successfully!");
      navigate("/appointments");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  // Get unique departments from doctors
  const departments = [...new Set(doctors.map((d) => d.department?.name).filter(Boolean))];

  // Filter doctors by selected department
  const filteredDoctors = formData.department
    ? doctors.filter((d) => d.department?.name === formData.department)
    : doctors;

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (!isAuthenticated) {
    return (
      <div className="patient-page">
        <div className="patient-page__container">
          <h2 className="patient-page__title">Please login to book an appointment</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-page">
      <div className="patient-page__container">
        <h1 className="patient-page__title">Book Appointment</h1>

        {loading ? (
          <p className="patient-page__loading">Loading doctors...</p>
        ) : (
          <form className="patient-page__form" onSubmit={handleSubmit}>
            <div className="patient-page__form-grid">
              <div className="patient-page__field">
                <label className="patient-page__label">Department</label>
                <select
                  className="patient-page__select"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="patient-page__field">
                <label className="patient-page__label">Doctor</label>
                <select
                  className="patient-page__select"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {filteredDoctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      Dr. {doc.firstName} {doc.lastName} — {doc.experience} exp — ₹{doc.appointmentCharges}
                    </option>
                  ))}
                </select>
              </div>

              {formData.doctorId && (
                <div className="patient-page__doctor-info">
                  {(() => {
                    const doc = doctors.find((d) => d._id === formData.doctorId);
                    if (!doc) return null;
                    return (
                      <div className="patient-page__card">
                        <h3>Dr. {doc.firstName} {doc.lastName}</h3>
                        <p><strong>Department:</strong> {doc.department?.name}</p>
                        <p><strong>Experience:</strong> {doc.experience}</p>
                        <p><strong>Charges:</strong> ₹{doc.appointmentCharges}</p>
                        {doc.specializations?.length > 0 && (
                          <p><strong>Specializations:</strong> {doc.specializations.map(s => s.name).join(", ")}</p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="patient-page__field">
                <label className="patient-page__label">Appointment Date</label>
                <input
                  className="patient-page__input"
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  min={getMinDate()}
                  required
                />
              </div>

              <div className="patient-page__field">
                <label className="patient-page__label">City</label>
                <input
                  className="patient-page__input"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>

              <div className="patient-page__field">
                <label className="patient-page__label">Pincode</label>
                <input
                  className="patient-page__input"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

            <button type="submit" className="patient-page__btn">
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookAppointment;
