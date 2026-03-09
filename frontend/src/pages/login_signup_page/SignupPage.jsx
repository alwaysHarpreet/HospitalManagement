import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";
import animationData from "../../lottie-animation/loginAnimation.json";
import axios from "axios";
import { Context } from "../../Context/Context";

function SignupPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(Context);
  const [strength, setStrength] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { password, cpassword } = formData;
    if (password !== cpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/patient/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: { city: formData.city, country: formData.country },
          dob: formData.dob,
          gender: formData.gender,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!");
        setIsAuthenticated(true);
        setUser(response.data.data.user);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    checkStrength(formData.password);
  }, [formData.password]);

  const checkStrength = (password) => {
    let strength = 0;

    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
    }
    if (password.match(/([0-9])/)) {
      strength += 1;
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
    }
    if (password.length > 7) {
      strength += 1;
    }

    setStrength(strength);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="signup-page">
      <div className="signup-page__animation">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="signup-page__form-container">
        <div className="signup-page__form-inner">
          <h1 className="signup-page__title">Signup</h1>
          <form className="signup-page__form" onSubmit={handleSignup}>
            <div className="signup-page__fields">
              <div className="signup-page__field">
                <label htmlFor="firstName" className="signup-page__label">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  id="firstName"
                  required
                  className="signup-page__input"
                />
              </div>
              <div className="signup-page__field">
                <label htmlFor="lastName" className="signup-page__label">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  id="lastName"
                  required
                  className="signup-page__input"
                />
              </div>
              <div className="signup-page__field">
                <label htmlFor="dob" className="signup-page__label">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  id="dob"
                  required
                  className="signup-page__input"
                />
              </div>
              <div className="signup-page__field">
                <label htmlFor="city" className="signup-page__label">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  id="city"
                  required
                  className="signup-page__input"
                />
              </div>
              <div className="signup-page__field">
                <label htmlFor="country" className="signup-page__label">
                  Country:
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  id="country"
                  required
                  className="signup-page__input"
                />
              </div>
              <div className="signup-page__field">
                <label htmlFor="phone" className="signup-page__label">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  id="phone"
                  required
                  className="signup-page__input"
                />
              </div>
              <div className="signup-page__field">
                <label htmlFor="email" className="signup-page__label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  id="email"
                  required
                  className="signup-page__input"
                />
              </div>
              <div className="signup-page__field">
                <label htmlFor="gender" className="signup-page__label">
                  Gender:
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  id="gender"
                  required
                  className="signup-page__select"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="signup-page__field">
                <label htmlFor="password" className="signup-page__label">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  id="password"
                  required
                  className="signup-page__input"
                />
              </div>
              <div className="signup-page__field">
                <label htmlFor="cpassword" className="signup-page__label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  value={formData.cpassword}
                  onChange={handleInputChange}
                  id="cpassword"
                  required
                  className="signup-page__input"
                />
              </div>
            </div>
            <div className="signup-page__strength-wrap">
              <div className="signup-page__strength-bar">
                <div
                  style={{
                    height: "10px",
                    width: `${strength * 25}%`,
                    backgroundColor:
                      strength === 1
                        ? "red"
                        : strength === 2
                        ? "orange"
                        : strength === 3
                        ? "yellow"
                        : "green",
                  }}
                ></div>
              </div>
              <div className="signup-page__strength-labels">
                {["Weak", "Fair", "Good", "Strong"].map((label, index) => (
                  <div
                    key={index}
                    className={`signup-page__strength-label ${index < strength ? "signup-page__strength-label--active" : ""}`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <button className="signup-page__submit">
              Create New Account
            </button>
            <Link to="/login">
              <p className="signup-page__login-link">
                Already have an account?
              </p>
            </Link>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
