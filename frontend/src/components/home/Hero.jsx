// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserMd,
  FaAward,
  FaHospital,
  FaHeartbeat,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";
import heroimg from "/hero.png";

function Hero() {
  return (
    <main className="hero">
      <section className="hero__container">
        {/* text container */}
        <section className="hero__text">
          <div className="hero__text-inner">
            <span className="hero__tagline">
              <FaShieldAlt className="hero__tagline-icon" />
              Your Health, Our Priority
            </span>
            <h1 className="hero__heading">
              Trusted Healthcare
              <span>At Your Fingertips</span>
            </h1>
            <p className="hero__para">
              HealthMatrix connects you with expert doctors, provides seamless
              appointments, and delivers medicines &amp; essentials — all in one
              secure, easy-to-use platform.
            </p>

            {/* feature pills */}
            <div className="hero__features">
              <div className="hero__feature-pill">
                <FaCheckCircle className="hero__feature-icon" />
                <span>Verified Doctors</span>
              </div>
              <div className="hero__feature-pill">
                <FaClock className="hero__feature-icon" />
                <span>24/7 Support</span>
              </div>
              <div className="hero__feature-pill">
                <FaShieldAlt className="hero__feature-icon" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>

          {/* stats row */}
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-icon-wrapper">
                <FaUserMd className="hero__stat-icon" />
              </div>
              <div>
                <h3 className="hero__stat-number">50+</h3>
                <p className="hero__stat-label">Expert Doctors</p>
              </div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-icon-wrapper">
                <FaAward className="hero__stat-icon" />
              </div>
              <div>
                <h3 className="hero__stat-number">20+</h3>
                <p className="hero__stat-label">Achievements</p>
              </div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-icon-wrapper">
                <FaHospital className="hero__stat-icon" />
              </div>
              <div>
                <h3 className="hero__stat-number">15+</h3>
                <p className="hero__stat-label">Specialities</p>
              </div>
            </div>
          </div>

          {/* ctas */}
          <div className="hero__ctas">
            <NavLink to="/alldoctors" className="hero__cta-link">
              <FaHeartbeat className="hero__cta-react-icon" />
              Book Appointment
            </NavLink>
            <NavLink
              to="/medicines/all"
              className="hero__cta-link hero__cta-link--secondary"
            >
              Buy Medicines
            </NavLink>
          </div>
        </section>

        {/* image section */}
        <section className="hero__image">
          <div className="hero__image-wrapper">
            {/* Decorative elements */}
            <div className="hero__image-ring hero__image-ring--outer"></div>
            <div className="hero__image-ring hero__image-ring--inner"></div>
            <div className="hero__image-blob"></div>

            {/* Doctor image */}
            <div className="hero__image-frame">
              <img
                src={heroimg}
                alt="Expert Doctor"
                className="hero__image-main"
              />
            </div>

            {/* Floating badge - rating */}
            <div className="hero__floating-badge hero__floating-badge--rating">
              <div className="hero__badge-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="hero__badge-text">4.9 Patient Rating</span>
            </div>

            {/* Floating badge - experience */}
            <div className="hero__floating-badge hero__floating-badge--experience">
              <div className="hero__badge-icon-circle">
                <FaUserMd />
              </div>
              <div>
                <span className="hero__badge-number">10K+</span>
                <span className="hero__badge-label">Happy Patients</span>
              </div>
            </div>

            {/* Pulse dot */}
            <div className="hero__pulse-dot"></div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Hero;
