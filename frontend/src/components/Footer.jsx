import React from "react";
import { axios } from "../import-export/ImportExport";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { toast } from "react-toastify";
// icons
import { FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeartbeat } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const navLinks = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/aboutus",
      display: "About Us",
    },
    {
      path: "/alldoctors",
      display: "Find a Doctor",
    },
    {
      path: "/medicines/all",
      display: "Pharmacy",
    },
    {
      path: "/privacypolicy",
      display: "Privacy Policy",
    },
    {
      path: "/termsandconditions",
      display: "Terms & Conditions",
    },
  ];

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/message/send",
          { email, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setEmail("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="footer">
      <div className="footer__inner">
        {/* footer top */}
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__brand-logo">
              <FaHeartbeat className="footer__brand-logo-icon" />
              <h1 className="footer__brand-title">HealthMatrix</h1>
            </div>
            <p className="footer__brand-desc">
              Your trusted partner in healthcare management. We connect patients
              with expert doctors, streamline appointments, and ensure quality
              care — all through one secure, intuitive platform.
            </p>
            {/* icons */}
            <div className="footer__social-icons">
              <a href="#" className="footer__social-btn" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="footer__social-btn" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="footer__social-btn" aria-label="Twitter">
                <FaXTwitter />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer__links">
            <h2 className="footer__links-title">Quick Links</h2>
            <ul className="footer__links-list">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className="footer__nav-link"
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer__contact">
            <h2 className="footer__contact-title">Get in Touch</h2>
            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <FaPhoneAlt className="footer__contact-icon" />
                <span>+91 98765 43210</span>
              </li>
              <li className="footer__contact-item">
                <FaEnvelope className="footer__contact-icon" />
                <span>support@healthmatrix.in</span>
              </li>
              <li className="footer__contact-item">
                <FaMapMarkerAlt className="footer__contact-icon" />
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="footer__divider"></div>

        {/* footer bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} HealthMatrix. All rights reserved.
          </p>
          <p className="footer__bottom-tagline">
            Designed with care for better healthcare.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
