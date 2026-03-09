import React, { useEffect, useState } from "react";
// import { axios } from "../../import-export/ImportExport";
import { toast } from "react-toastify";
import axios from "axios";

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
        console.error("Error fetching doctors:", error);
      }
    };
    fetchTestimonials();
  }, []);
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
  //   );
  // };

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

  return (
    <main className="testimonials">
      <section className="testimonials__inner">
        {/* Text container */}
        <div className="testimonials__text">
          <div className="testimonials__text-inner">
            <h3 className="testimonials__label">Testimonial</h3>
            <h1 className="testimonials__title">
              What They Say?
            </h1>
            <p className="testimonials__desc">
              HealthMatrix has got more than
              <span className="testimonials__desc-highlight">
                10k positive ratings
              </span>{" "}
              from our users around the world.
            </p>
            <p className="testimonials__desc">
              Some of the Doctors and Paitient were greatly helped by the
              Medi-Hub.
            </p>
            <p className="testimonials__desc">
              Are you too? Please give your feedback.
            </p>

            {/* Feedback cta */}
            <button
              onClick={() => setShowForm(true)}
              className="testimonials__cta"
            >
              Send Your Feedback &#8594;
            </button>
          </div>
        </div>

        {/* Testimonial cards container */}
        <div className="testimonials__cards">
          {/* image container */}
          <div className="testimonials__image-container">
            <img
              src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
              alt="image"
              className="testimonials__image"
            />

            {/* feedback messasges and ratings */}
            <div className="testimonials__feedback-card">
              {/* feeback msg  */}
              <div style={{overflow: 'hidden'}}>
                <p className="testimonials__feedback-msg">
                  Loved the expirence at medi-hub, best health care system that
                  make the user life eaiser.
                </p>
              </div>

              {/* name and rating stars */}
              <div className="testimonials__feedback-footer">
                <div className="testimonials__feedback-name">
                  <h4>
                    Parth kumar
                  </h4>
                </div>
                <div className="testimonials__feedback-stars">stars</div>
              </div>
            </div>
            {/* <h4 className="font-bold text-center">
              {testimonials[currentIndex].profile}
            </h4>
            <p className="text-sm text-center mb-6">
              {testimonials[currentIndex].country},{" "}
              {testimonials[currentIndex].state}
            </p>
            <p className="mt-2 text-center">
              {testimonials[currentIndex].review}
            </p>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button
                onClick={handlePrev}
                className="bg-white bg-opacity-50 text-black rounded-full p-2 hover:bg-opacity-100"
              >
                &#8592;
              </button>
              <button
                onClick={handleNext}
                className="bg-white bg-opacity-50 text-black rounded-full p-2 hover:bg-opacity-100"
              >
                &#8594;
              </button>
            </div> */}
          </div>
        </div>

        {/* Testiomonials message*/}
        {showForm && (
          <div className="testimonials__modal">
            <div className="testimonials__modal-inner">
              <form
                onSubmit={handleFeedback}
                className="testimonials__form"
              >
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name"
                  className="testimonials__input"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="testimonials__input"
                />
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
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Your Review"
                  className="testimonials__input"
                ></textarea>
                <input
                  type="file"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Profile Picture URL"
                  className="testimonials__input"
                />
                <button
                  type="submit"
                  className="testimonials__submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Testimonials;
