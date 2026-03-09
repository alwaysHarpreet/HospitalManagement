import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";

function Billing() {
  const { isAuthenticated } = useContext(Context);
  const [billing, setBilling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBilling();
  }, []);

  const fetchBilling = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/patient/my-billing", {
        withCredentials: true,
      });
      setBilling(res.data.data);
    } catch (error) {
      toast.error("Failed to load billing details");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = billing.reduce((sum, item) => {
    return sum + (parseFloat(item.appointmentCharges) || 0);
  }, 0);

  if (!isAuthenticated) {
    return (
      <div className="patient-page">
        <div className="patient-page__container">
          <h2 className="patient-page__title">Please login to view billing</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-page">
      <div className="patient-page__container">
        <h1 className="patient-page__title">Billing Details</h1>

        {loading ? (
          <p className="patient-page__loading">Loading...</p>
        ) : billing.length === 0 ? (
          <div className="patient-page__empty">
            <p>No billing records found.</p>
          </div>
        ) : (
          <>
            <div className="patient-page__billing-summary">
              <div className="patient-page__card">
                <h3>Total Billed</h3>
                <p className="patient-page__amount">₹{totalAmount.toLocaleString()}</p>
                <p className="patient-page__subtext">{billing.length} appointment(s)</p>
              </div>
            </div>

            <div className="patient-page__table-wrap">
              <table className="patient-page__table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Treatment Status</th>
                    <th>Charges</th>
                  </tr>
                </thead>
                <tbody>
                  {billing.map((item) => (
                    <tr key={item._id}>
                      <td>{new Date(item.appointmentDate).toLocaleDateString()}</td>
                      <td>Dr. {item.doctorFirstName} {item.doctorLastName}</td>
                      <td>{item.department}</td>
                      <td>{item.treatmentStatus}</td>
                      <td>₹{item.appointmentCharges || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Billing;
