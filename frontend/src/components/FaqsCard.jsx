import { useRef, useState } from "react";

const FaqsCard = ({ faq }) => {
    const answerElRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [answerHeight, setAnswerHeight] = useState('0px');

    const handleToggle = () => {
        const answerElHeight = answerElRef.current.scrollHeight;
        setIsOpen(!isOpen);
        setAnswerHeight(isOpen ? '0px' : `${answerElHeight}px`);
    };

    return (
        <div className="faq-card" onClick={handleToggle}>
            <h4 className="faq-card__question">
                {faq.q}
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="faq-card__toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="faq-card__toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                )}
            </h4>
            <div
                ref={answerElRef}
                className="faq-card__answer"
                style={{ height: answerHeight }}
            >
                <div className="faq-card__answer-inner">
                    <p className="faq-card__answer-text">
                        {faq.a}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const faqsList = [
        {
            q: "How can i book an appointment with HealthMatrix ?",
            a: "To book an online appointment you can visit the website of HealthMatrix, search for Docters . Once you make the payment and confirm the consultation, your online appointment will be booked for the chosen appointment time."
        },
        {
            q: "Why do patients visit HealthMatrix ?",
            a: "Patients visit HealthMatrix for health related problems. To see more reasons visit the doctor's profile on HealthMatrix."
        },
        {
            q: "How can I take an appointment with HealthMatrix ?",
            a: "To book an online appointment you can visit the website of HealthMatrix, search for Docters . Once you make the payment and confirm the consultation, your online appointment will be booked for the chosen appointment time."
        },
        {
            q: "Why to choose HealthMatrix ?",
            a: "Because, it is a one stop solution for you."
        }
    ];

    return (
        <section className="faqs-section">
            <div className="faqs-section__header">
                <h1 className="faqs-section__title">
                    Frequently Asked Questions
                </h1>
                <p className="faqs-section__subtitle">
                    Answered all frequently asked questions, Still confused? feel free to contact us.
                </p>
            </div>
            <div className="faqs-section__list">
                {faqsList.map((faq, idx) => (
                    <FaqsCard key={idx} faq={faq} />
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
