import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// react icons
import {
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCalendarCheck, FaRegHeart } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineReceiptLong, MdOutlineMedicalServices } from "react-icons/md";
import { Context } from "../Context/Context";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [show, setShow] = useState(false);

  const handleLogOut = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message || "Logged out successfully");
      setIsAuthenticated(false);
      setUser({});
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navigate = useNavigate();

  // state to manage drop down menu
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav items
  const navItems = [
    { to: "/alldoctors", label: "All Doctors" },
    { to: "/specialities", label: "Specialities" },
    { to: "/medicines", label: "Medicines" },
    { to: "/appointment", label: "Appointment" },
  ];

  // mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Dropdown menus
  const dropdownMenus = [
    { to: "/profile", label: "My Profile", icon: FaRegCircleUser },
    { to: "/appointments", label: "Appointments", icon: FaRegCalendarCheck },
    { to: "/prescriptions", label: "Prescriptions", icon: MdOutlineMedicalServices },
    { to: "/billing", label: "Billing", icon: MdOutlineReceiptLong },
    { to: "medicines/wishlist", label: "Wishlist", icon: FaRegHeart },
    { to: "medicines/order_history", label: "Orders", icon: LuBox },
  ];

  // mouse events on drop down menu
  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleNavigation = () => {
    navigate("/medicines/cart");
  };

  const socialLinks = [
    {
      to: "#",
      label: "github",
      icon: FaGithub,
    },
    {
      to: "#",
      label: "linkedin",
      icon: FaLinkedinIn,
    },
    { to: "#", label: "discord", icon: FaDiscord },
  ];

  return (
    <div className="navbar">
      <div className="navbar__inner">
        {/* logo */}
        <NavLink to="/">
          <h1 className="navbar__logo">
            HealthMatrix
          </h1>
        </NavLink>

        {/* Nav Menus */}
        <div className="navbar__menu">
          <ul className="navbar__menu-list">
            {navItems.map((navItem, index) => (
              <li key={index}>
                <NavLink to={navItem.to} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>
                  {navItem.label}
                </NavLink>
              </li>
            ))}
            <li
              className="navbar__login-item"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isAuthenticated ? (
                <>
                  <div className="navbar__login-btn" style={{ cursor: "pointer" }}>
                    <FaRegCircleUser className="navbar__login-icon" />
                    <span className="navbar__login-text">Account</span>
                  </div>

                  {/* Dropdown Menus */}
                  {isDropdownOpen && (
                    <div
                      className="navbar__dropdown"
                      onMouseEnter={handleMouseEnter}
                    >
                      {dropdownMenus.map((menu, index) => (
                        <NavLink
                          key={index}
                          to={menu.to}
                          className="navbar__dropdown-link"
                        >
                          {menu.icon && (
                            <menu.icon className="navbar__dropdown-icon" />
                          )}
                          {menu.label}
                        </NavLink>
                      ))}
                      <div
                        className="navbar__dropdown-link"
                        style={{ cursor: "pointer" }}
                        onClick={handleLogOut}
                      >
                        <IoIosLogOut className="navbar__dropdown-icon" />
                        Logout
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="navbar__login-btn"
                >
                  <FaRegCircleUser className="navbar__login-icon" />
                  <span className="navbar__login-text">Login</span>
                </NavLink>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle button */}
        <div className="navbar__mobile-toggle">
          <button onClick={toggleMobileMenu} className="navbar__mobile-toggle-icon">
            {isMobileMenuOpen ? (
              <FaTimes
                size={26}
                className="navbar__mobile-close-icon"
              />
            ) : (
              <FaBars size={26} />
            )}
          </button>
        </div>

        {/* Social Icons and Cart (desktop) */}
        <div className="navbar__social">
          <div
            onClick={handleNavigation}
            className="navbar__cart-btn"
            role="button"
          >
            <IoCartOutline className="navbar__cart-icon" />
            <div className="navbar__cart-badge">
              <span>7</span>
            </div>
          </div>

          {socialLinks.map((socialLink, index) => (
            <NavLink key={index} to={socialLink.to} target="_blank">
              <socialLink.icon className="navbar__social-icon" />
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div>
          <div
            className="navbar__mobile-overlay"
            onClick={toggleMobileMenu}
          ></div>
          <div className="navbar__mobile-menu">
            <ul className="navbar__mobile-list">
              {navItems.map((navItem, index) => (
                <li key={index}>
                  <NavLink
                    to={navItem.to}
                    className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}
                    onClick={toggleMobileMenu}
                  >
                    {navItem.label}
                  </NavLink>
                </li>
              ))}
              <li className="navbar__login-item">
                {isAuthenticated ? (
                  <>
                    <div
                      className="navbar__login-btn"
                      style={{ cursor: "pointer" }}
                      onClick={() => setDropdownOpen(!isDropdownOpen)}
                    >
                      <FaRegCircleUser className="navbar__login-icon" />
                      <span className="navbar__login-text">Account</span>
                    </div>

                    {isDropdownOpen && (
                      <div className="navbar__mobile-dropdown">
                        {dropdownMenus.map((menu, index) => (
                          <NavLink
                            key={index}
                            to={menu.to}
                            className="navbar__dropdown-link"
                            onClick={toggleMobileMenu}
                          >
                            {menu.icon && (
                              <menu.icon className="navbar__dropdown-icon" />
                            )}{" "}
                            {menu.label}
                          </NavLink>
                        ))}
                        <div
                          className="navbar__dropdown-link"
                          style={{ cursor: "pointer" }}
                          onClick={() => { handleLogOut(); toggleMobileMenu(); }}
                        >
                          <IoIosLogOut className="navbar__dropdown-icon" />
                          Logout
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="navbar__login-btn"
                    onClick={toggleMobileMenu}
                  >
                    <FaRegCircleUser className="navbar__login-icon" />
                    <span className="navbar__login-text">Login</span>
                  </NavLink>
                )}
              </li>

              {/* Social Icons (mobile) */}
              <div className="navbar__mobile-social">
                {socialLinks.map((socialLink, index) => (
                  <NavLink key={index} to={socialLink.to} target="_blank">
                    <socialLink.icon className="navbar__mobile-social-icon" />
                  </NavLink>
                ))}
              </div>

              {/* Cart (mobile) */}
              <div className="navbar__mobile-cart">
                <div
                  className="navbar__cart-btn"
                  role="button"
                  onClick={handleNavigation}
                >
                  <IoCartOutline className="navbar__mobile-cart-icon" />
                  <div className="navbar__cart-badge">
                    <span>7</span>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
