import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";

function Profile() {
  const { user, setUser, isAuthenticated } = useContext(Context);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    country: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (user && user.firstName) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        city: user.address?.city || "",
        country: user.address?.country || "",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/patient/update-profile",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: { city: formData.city, country: formData.country },
          dob: formData.dob,
          gender: formData.gender,
        },
        { withCredentials: true }
      );
      toast.success("Profile updated successfully");
      setUser(res.data.data);
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="patient-page">
        <div className="patient-page__container">
          <h2 className="patient-page__title">Please login to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-page">
      <div className="patient-page__container">
        <h1 className="patient-page__title">My Profile</h1>

        {!editing ? (
          <div className="patient-page__card">
            <div className="patient-page__info-grid">
              <div className="patient-page__info-item">
                <span className="patient-page__label">Name</span>
                <span className="patient-page__value">{user.firstName} {user.lastName}</span>
              </div>
              <div className="patient-page__info-item">
                <span className="patient-page__label">Email</span>
                <span className="patient-page__value">{user.email}</span>
              </div>
              <div className="patient-page__info-item">
                <span className="patient-page__label">Phone</span>
                <span className="patient-page__value">{user.phone}</span>
              </div>
              <div className="patient-page__info-item">
                <span className="patient-page__label">Gender</span>
                <span className="patient-page__value">{user.gender}</span>
              </div>
              <div className="patient-page__info-item">
                <span className="patient-page__label">Date of Birth</span>
                <span className="patient-page__value">
                  {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="patient-page__info-item">
                <span className="patient-page__label">Address</span>
                <span className="patient-page__value">
                  {user.address?.city ? `${user.address.city}, ${user.address.country}` : "N/A"}
                </span>
              </div>
            </div>
            <button className="patient-page__btn" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form className="patient-page__form" onSubmit={handleSubmit}>
            <div className="patient-page__form-grid">
              <div className="patient-page__field">
                <label className="patient-page__label">First Name</label>
                <input className="patient-page__input" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="patient-page__field">
                <label className="patient-page__label">Last Name</label>
                <input className="patient-page__input" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="patient-page__field">
                <label className="patient-page__label">Phone</label>
                <input className="patient-page__input" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="patient-page__field">
                <label className="patient-page__label">Gender</label>
                <select className="patient-page__select" name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="patient-page__field">
                <label className="patient-page__label">Date of Birth</label>
                <input className="patient-page__input" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="patient-page__field">
                <label className="patient-page__label">City</label>
                <input className="patient-page__input" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="patient-page__field">
                <label className="patient-page__label">Country</label>
                <input className="patient-page__input" name="country" value={formData.country} onChange={handleChange} />
              </div>
            </div>
            <div className="patient-page__btn-group">
              <button type="submit" className="patient-page__btn">Save Changes</button>
              <button type="button" className="patient-page__btn patient-page__btn--secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
