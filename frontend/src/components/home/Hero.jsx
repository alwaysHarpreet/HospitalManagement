// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserMd, FaAward, FaHospital, FaHeartbeat } from "react-icons/fa";
import heroimg from "/hero.png";

function Hero() {
  return (
    <main className="hero">
      <section className="hero__container">
        {/* text container */}
        <section className="hero__text">
          <div className="hero__text-inner">
            <span className="hero__tagline">Your Health, Our Priority</span>
            <h1 className="hero__heading">
              Trusted Healthcare
              <span> At Your Fingertips</span>
            </h1>
            <p className="hero__para">
              HealthMatrix connects you with expert doctors, provides seamless
              appointments, and delivers medicines &amp; essentials — all in one
              place.
            </p>
          </div>

          {/* stats row */}
          <div className="hero__stats">
            <div className="hero__stat">
              <FaUserMd className="hero__stat-icon" />
              <div>
                <h3 className="hero__stat-number">50+</h3>
                <p className="hero__stat-label">Expert Doctors</p>
              </div>
            </div>
            <div className="hero__stat">
              <FaAward className="hero__stat-icon" />
              <div>
                <h3 className="hero__stat-number">20+</h3>
                <p className="hero__stat-label">Achievements</p>
              </div>
            </div>
            <div className="hero__stat">
              <FaHospital className="hero__stat-icon" />
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
            <div className="hero__image-blob"></div>
            <img
              src={heroimg}
              alt="Doctors team"
              className="hero__image-main"
            />
          </div>
        </section>
      </section>
    </main>
  );
}

export default Hero;
