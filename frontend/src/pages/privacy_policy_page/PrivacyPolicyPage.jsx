import React from "react";

function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy">
      <h1 className="privacy-policy__title">Privacy Policy</h1>
      <div className="privacy-policy__grid">
        <div className="privacy-policy__card privacy-policy__card--blue">
          <h2 className="privacy-policy__card-title privacy-policy__card-title--blue">
            Purpose of Information
          </h2>
          <p className="privacy-policy__card-desc">
            Clearly state the purpose for which the collected information will
            be used. For instance, scheduling appointments, communicating test
            results, etc.
          </p>
        </div>
        <div className="privacy-policy__card privacy-policy__card--green">
          <h2 className="privacy-policy__card-title privacy-policy__card-title--green">
            Cookies and Tracking
          </h2>
          <p className="privacy-policy__card-desc">
            Explain if your website uses cookies or other tracking technologies,
            and how they are used to enhance the user experience. Provide users
            with options to manage cookie preferences.
          </p>
        </div>
        <div className="privacy-policy__card privacy-policy__card--yellow">
          <h2 className="privacy-policy__card-title privacy-policy__card-title--yellow">
            Children's Privacy
          </h2>
          <p className="privacy-policy__card-desc">
            f your website collects information from children under the age of
            13 (or any other applicable age), comply with relevant laws such as
            the Children's Online Privacy Protection Act (COPPA).
          </p>
        </div>
        <div className="privacy-policy__card privacy-policy__card--purple">
          <h2 className="privacy-policy__card-title privacy-policy__card-title--purple">
            Contact Information
          </h2>
          <p className="privacy-policy__card-desc">
            Provide contact details for users to reach out with questions or
            concerns about the privacy policy or their personal data.
          </p>
        </div>
        <div className="privacy-policy__card privacy-policy__card--red">
          <h2 className="privacy-policy__card-title privacy-policy__card-title--red">
            Updates to Privacy Policy
          </h2>
          <p className="privacy-policy__card-desc">
            State that the privacy policy may be updated from time to time, and
            how users will be notified of any changes.
          </p>
        </div>
        <div className="privacy-policy__card privacy-policy__card--blue">
          <h2 className="privacy-policy__card-title privacy-policy__card-title--blue">
            User Rights
          </h2>
          <p className="privacy-policy__card-desc">
            {" "}
            Inform users about their rights regarding their personal data,
            including the right to access, update, or delete their information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
