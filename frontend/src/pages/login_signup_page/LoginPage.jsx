import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";
import animationData from "../../lottie-animation/loginAnimation.json";
import { Context } from "../../Context/Context";

function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(Context);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, role } = formData;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          email,
          password,
          confirmPassword,
          role,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Login successful");
        setIsAuthenticated(true);
        setUser(response.data.data.user);
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
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
    <div className="login-page">

      <div className="login-page__animation">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="login-page__form-container">
        <div className="login-page__form-inner">
          <h1 className="login-page__title">Welcome back</h1>
          <h2 className="login-page__subtitle">Login your account</h2>
          <form
            className="login-page__form"
            id="login-form"
            onSubmit={handleLogin}
          >
            <label htmlFor="email" className="login-page__label">
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
              className="login-page__input"
            />
            <label htmlFor="password" className="login-page__label">
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
              className="login-page__input"
            />
            <label htmlFor="confirmPassword" className="login-page__label">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              id="confirmPassword"
              required
              className="login-page__input"
            />
            <label htmlFor="role" className="login-page__label">
              Role:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              id="role"
              className="login-page__input"
            >
              <option value="Patient">Patient</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
            </select>
            <button
              className="login-page__submit"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="login-page__links">
            <Link
              to="/signup"
              className="login-page__link"
            >
              Create Account
            </Link>
            <Link
              to="/"
              className="login-page__link"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
