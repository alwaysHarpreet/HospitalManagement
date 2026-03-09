import React from "react";

import { BiSolidFirstAid } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";

function WhyUs() {
  return (
    <div className="why-us">
      <div className="why-us__inner">
        <h1 className="why-us__title">
          Why Choose Us
        </h1>
        <p className="why-us__subtitle">
          We understand that your health and well-being are of paramount
          importance. Here are compelling reasons why you should choose us for
          your healthcare needs
        </p>

        {/* cards */}
        <div className="why-us__cards">
          {/* Aid card  */}
          <div className="why-us__card why-us__card--blue">
            <div className="why-us__card-content">
              <div className="icon">
                <BiSolidFirstAid className="why-us__card-icon why-us__card-icon--red" />
              </div>

              <div className="text">
                <h1 className="why-us__card-title">
                  Advanced Technology
                </h1>
                <p className="why-us__card-desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Commodi repellat numquam, dolore necessitatibus excepturi
                  velit saepe consequatur magnam, unde officiis, hic ipsam nemo
                  praesentium nam quo.
                </p>
              </div>
            </div>
          </div>
          {/* Doctors card */}
          <div className="why-us__card why-us__card--yellow">
            <div className="why-us__card-content">
              <div className="icon">
                <FaUserDoctor className="why-us__card-icon why-us__card-icon--green" />
              </div>

              <div className="text">
                <h1 className="why-us__card-title">
                  Certified Doctors
                </h1>
                <p className="why-us__card-desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Commodi repellat numquam, dolore necessitatibus excepturi
                  velit saepe consequatur magnam, unde officiis, hic ipsam nemo
                  praesentium nam quo.
                </p>
              </div>
            </div>
          </div>
          {/* Infrastrucutre card */}
          <div className="why-us__card why-us__card--pink">
            <div className="why-us__card-content">
              <div className="icon">
                <FaRegBuilding className="why-us__card-icon why-us__card-icon--gray" />
              </div>

              <div className="text">
                <h1 className="why-us__card-title">
                  Best Infrastrucutre
                </h1>
                <p className="why-us__card-desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Commodi repellat numquam, dolore necessitatibus excepturi
                  velit saepe consequatur magnam, unde officiis, hic ipsam nemo
                  praesentium nam quo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
