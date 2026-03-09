import React from "react";
import { axios } from "../import-export/ImportExport";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { toast } from "react-toastify";
// icons
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
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
      path: "/privacypolicy",
      display: "Privacy Policy",
    },
    {
      path: "/termsandconditions",
      display: "Terms and Conditions",
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
          {/* Title */}
          <div className="footer__brand">
            <h1 className="footer__brand-title">
              HealthMatrix
            </h1>
            {/* desc */}
            <p className="footer__brand-desc">
              HealthMatrix is a web-based platform facilitating seamless management
              of healthcare services, including appointments, patient records,
              and doctor interactions.
            </p>
            {/* icons */}
            <div className="footer__social-icons">
              <div className="footer__social-btn">
                <a
                  href="#"
                >
                  <FaInstagram />
                </a>
              </div>
              <div className="footer__social-btn">
                <a
                  href="#"
                >
                  <FaLinkedin />
                </a>
              </div>
              <div className="footer__social-btn">
                <a
                  href="#"
                >
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>
          {/* Quick links */}
          <div className="footer__links">
            <h1 className="footer__links-title">
              Quick Links
            </h1>
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
          {/* Contact US */}
          {/* <form
            onSubmit={handleMessage}
            className="cols-span-1 md:col-span-5 grid gap-y-5"
          >
            <h1 className="text-left text-xl font-bold text-black/80">
              Contact Us
            </h1>
            <div className="relative flex justify-left space-y-7">
              <label
                htmlFor="email"
                className="text-md font-normal absolute top-0 left-0"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Enter you email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-3 rounded-md  grow"
              />
            </div>
            <div className="relative flex justify-left space-y-7">
              <label
                htmlFor="message"
                className="text-md font-normal absolute top-0 left-0"
              >
                Message
              </label>
              <textarea
                rows={7}
                placeholder="Write Your Message Here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="px-3 py-3 rounded-md grow"
              />
            </div>
            <button
              type="submit"
              className="grow bg-main_theme text-white py-3 rounded-md"
            >
              Send Message
            </button>
          </form> */}
        </div>

        {/* footer bottom */}
        <div className="footer__bottom">
          {/* copyright */}
          <p className="footer__copyright">
            © {new Date().getFullYear()} Harish Reddy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
