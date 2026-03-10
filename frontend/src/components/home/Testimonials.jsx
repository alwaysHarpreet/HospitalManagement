import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaStar, FaQuoteLeft, FaHeart, FaShieldAlt, FaUserMd } from "react-icons/fa";

function Testimonials() {
  const [testimonial, setTestimonial] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [review, setReview] = useState("");
  const [image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/testimonial/getall"
        );
        setTestimonial(response.data.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/api/v1/testimonial/add",
          { fullName, email, country, state, review },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFullName("");
          setEmail("");
          setCountry("");
          setState("");
          setReview("");
          setImage("");
          setShowForm(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const renderStars = (count = 5) =>
    Array.from({ length: count }, (_, i) => (
      <FaStar key={i} className="testimonials__star-icon" />
    ));

  return (
    <main className="testimonials">
      <section className="testimonials__inner">
        {/* Text container */}
        <div className="testimonials__text">
          <div className="testimonials__text-inner">
            <span className="testimonials__label">
              <FaHeart className="testimonials__label-icon" />
              Patient Testimonials
            </span>
            <h1 className="testimonials__title">
              Trusted by Thousands <br />
              <span className="testimonials__title-accent">of Patients Worldwide</span>
            </h1>
            <p className="testimonials__desc">
              With over
              <span className="testimonials__desc-highlight">
                {" "}10,000+ positive ratings
              </span>,{" "}
              HealthMatrix is committed to delivering compassionate, reliable, and
              world-class healthcare experiences.
            </p>

            {/* trust badges */}
            <div className="testimonials__trust-badges">
              <div className="testimonials__badge">
                <FaShieldAlt className="testimonials__badge-icon" />
                <span>Verified Reviews</span>
              </div>
              <div className="testimonials__badge">
                <FaUserMd className="testimonials__badge-icon" />
                <span>50+ Specialists</span>
              </div>
            </div>

            {/* Feedback cta */}
            <button
              onClick={() => setShowForm(true)}
              className="testimonials__cta"
            >
              Share Your Experience
              <span className="testimonials__cta-arrow">&#8594;</span>
            </button>
          </div>
        </div>

        {/* Testimonial cards container */}
        <div className="testimonials__cards">
          <div className="testimonials__cards-grid">
            {/* Primary card */}
            <div className="testimonials__card testimonials__card--primary">
              <FaQuoteLeft className="testimonials__quote-icon" />
              <p className="testimonials__card-text">
                HealthMatrix transformed my healthcare journey. The doctors are
                incredibly attentive and the appointment system is seamless. Best
                healthcare platform I have ever used.
              </p>
              <div className="testimonials__card-footer">
                <div className="testimonials__card-avatar">
                  <img
                    src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                    alt="Parth Kumar"
                  />
                </div>
                <div className="testimonials__card-info">
                  <h4 className="testimonials__card-name">Parth Kumar</h4>
                  <p className="testimonials__card-role">Patient</p>
                </div>
                <div className="testimonials__card-stars">
                  {renderStars(5)}
                </div>
              </div>
            </div>

            {/* Secondary card */}
            <div className="testimonials__card testimonials__card--secondary">
              <FaQuoteLeft className="testimonials__quote-icon" />
              <p className="testimonials__card-text">
                Booking appointments has never been easier. The platform is intuitive
                and the medical team responds promptly. Highly recommended for families.
              </p>
              <div className="testimonials__card-footer">
                <div className="testimonials__card-avatar">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Ananya Sharma"
                  />
                </div>
                <div className="testimonials__card-info">
                  <h4 className="testimonials__card-name">Ananya Sharma</h4>
                  <p className="testimonials__card-role">Patient</p>
                </div>
                <div className="testimonials__card-stars">
                  {renderStars(5)}
                </div>
              </div>
            </div>

            {/* Tertiary card */}
            <div className="testimonials__card testimonials__card--tertiary">
              <FaQuoteLeft className="testimonials__quote-icon" />
              <p className="testimonials__card-text">
                Excellent care and truly professional staff. The online medicine
                delivery saved me so much time. Thank you, HealthMatrix!
              </p>
              <div className="testimonials__card-footer">
                <div className="testimonials__card-avatar">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Rajeev Menon"
                  />
                </div>
                <div className="testimonials__card-info">
                  <h4 className="testimonials__card-name">Rajeev Menon</h4>
                  <p className="testimonials__card-role">Patient</p>
                </div>
                <div className="testimonials__card-stars">
                  {renderStars(5)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials feedback form modal */}
        {showForm && (
          <div className="testimonials__modal" onClick={() => setShowForm(false)}>
            <div className="testimonials__modal-inner" onClick={(e) => e.stopPropagation()}>
              <h2 className="testimonials__modal-title">Share Your Experience</h2>
              <p className="testimonials__modal-subtitle">Your feedback helps us improve patient care</p>
              <form
                onSubmit={handleFeedback}
                className="testimonials__form"
              >
                <div className="testimonials__form-row">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="testimonials__input"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="testimonials__input"
                  />
                </div>
                <div className="testimonials__form-row">
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="testimonials__input"
                  />
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="testimonials__input"
                  />
                </div>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="testimonials__input testimonials__textarea"
                  rows={4}
                ></textarea>
                <div className="testimonials__form-actions">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="testimonials__cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="testimonials__submit"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Testimonials;
