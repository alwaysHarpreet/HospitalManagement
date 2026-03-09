import React from "react";

const WhatIsMedihub = () => {
  return (
    <div className="what-is-medihub">
      <h1 className="what-is-medihub__title">
        What is <span>HealthMatrix?</span>
      </h1>
      <p className="what-is-medihub__desc">
        HealthMatrix is a web-based platform facilitating seamless management of
        healthcare services, including appointments, patient records, and doctor
        interactions.
      </p>
      <div className="what-is-medihub__cards">
        <div className="what-is-medihub__card what-is-medihub__card--left">
          <img
            src="/instructorImage.png"
            alt="Instructors"
            style={{width: '100%', objectFit: 'cover'}}
          />
          <div className="what-is-medihub__card-overlay">
            <h2>
              FOR INSTRUCTORS
            </h2>
            <button className="what-is-medihub__card-btn">
              Start a Class Today
            </button>
          </div>
        </div>

        <div className="what-is-medihub__card what-is-medihub__card--right">
          <img
            src="/studentsImage.png"
            alt="Students"
            style={{width: '100%', objectFit: 'cover'}}
          />
          <div className="what-is-medihub__card-overlay">
            <h2>FOR STUDENTS</h2>
            <button className="what-is-medihub__card-btn what-is-medihub__card-btn--cyan">
              Enter Access Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMedihub;
