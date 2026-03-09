import React from "react";

function AboutUsPage() {
  return (
    <div className="about-us">
      <h1 className="about-us__title">About Us</h1>
      <div className="about-us__grid">
        <div className="about-us__card about-us__card--blue">
          <h2 className="about-us__card-title about-us__card-title--blue">
            Welcome to Our Platform
          </h2>
          <p className="about-us__card-desc">
            A web-based platform facilitating seamless management of healthcare
            services, including appointments, patient records, and doctor
            interactions.
          </p>
        </div>
        <div className="about-us__card about-us__card--green">
          <h2 className="about-us__card-title about-us__card-title--green">
            Secure User Authentication
          </h2>
          <p className="about-us__card-desc">
            Implemented robust user authentication and authorization
            functionalities to ensure secure access to patient and doctor and
            admin portals.
          </p>
        </div>
        <div className="about-us__card about-us__card--yellow">
          <h2 className="about-us__card-title about-us__card-title--yellow">
            File Upload Management with Cloud Services
          </h2>
          <p className="about-us__card-desc">
            Utilized Multer and integrated Cloudinary to efficiently handle file
            uploads, particularly images, ensuring optimal storage, retrieval,
            and user experience.
          </p>
        </div>
        <div className="about-us__card about-us__card--purple">
          <h2 className="about-us__card-title about-us__card-title--purple">
            Version Control with Git
          </h2>
          <p className="about-us__card-desc">
            Utilized Git for version control, enabling efficient project
            tracking and management of code changes throughout the development
            lifecycle.
          </p>
        </div>
        <div className="about-us__card about-us__card--red">
          <h2 className="about-us__card-title about-us__card-title--red">
            Admin Dashboard Development
          </h2>
          <p className="about-us__card-desc">
            Developed an intuitive admin dashboard facilitating user management,
            appointment scheduling, and data analytics, empowering
            administrators with comprehensive control and insights.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
