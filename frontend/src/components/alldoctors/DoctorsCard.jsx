import React from "react";
import { NavLink } from "react-router-dom";
import { FaHospital, FaVideo } from "react-icons/fa";
import hero from "/new_hero.png";
import langIcon from "/language.webp";
import { SkeletonLoading, useLoading } from "../../import-export/ImportExport";

const DoctorsCard = ({ doctor }) => {
  const loading = useLoading(1000); // Using the custom hook

  return (
    <section className="doctor-card">
      {loading || !doctor ? (
        <SkeletonLoading />
      ) : (
        <>
          <div className="doctor-card__header">
            {/* Avatar with lazy loading */}
            <img
              src={doctor.docAvatar || hero}
              alt="hero"
              className="doctor-card__avatar"
              loading="lazy"
            />

            {/* Details */}
            <div className="doctor-card__details">
              <h2 className="doctor-card__name">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <h3 className="doctor-card__department">
                {doctor.department.name}
              </h3>
              <h3 className="doctor-card__experience">
                {doctor.experience} EXP.
              </h3>
              <p className="doctor-card__qualifications">
                {doctor.qualifications.join(", ")}
              </p>
              {/* Appointment fees for above medium screens */}
              <div className="doctor-card__fees">
                <div>
                  <p className="doctor-card__fee-label">
                    You pay
                  </p>
                  <p className="doctor-card__fee-amount">
                    Rs {doctor.appointmentCharges}
                  </p>
                </div>
                {/* Cashback */}
                <div className="doctor-card__cashback">
                  <p className="doctor-card__cashback-label">
                    HEALTHMATRIX CASHBACK
                  </p>
                  <p className="doctor-card__cashback-amount">Rs 51</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment fees for smaller screen */}
          <div className="doctor-card__fees-mobile">
            <div>
              <p className="doctor-card__fee-label">You pay</p>
              <p className="doctor-card__fee-amount">
                Rs {doctor.appointmentCharges}
              </p>
            </div>

            {/* Cashback */}
            <div className="doctor-card__cashback">
              <p className="doctor-card__cashback-label">
                HEALTHMATRIX CASHBACK
              </p>
              <p className="doctor-card__cashback-amount">Rs 51</p>
            </div>
          </div>

          {/* Languages */}
          <div className="doctor-card__languages">
            <img src={langIcon} alt="voice" className="doctor-card__lang-icon" />
            <p className="doctor-card__lang-text">
              {doctor.languagesKnown.join(", ")}
            </p>
          </div>

          {/* Actions */}
          <div className="doctor-card__ctas">
            <NavLink className="doctor-card__cta doctor-card__cta--digital">
              <FaVideo className="doctor-card__cta-icon doctor-card__cta-icon--white" />
              Book Digital Consult
            </NavLink>
            <NavLink className="doctor-card__cta doctor-card__cta--hospital">
              <FaHospital className="doctor-card__cta-icon doctor-card__cta-icon--dark" />
              Book Hospital Visit
            </NavLink>
          </div>
        </>
      )}
    </section>
  );
};

export default DoctorsCard;
