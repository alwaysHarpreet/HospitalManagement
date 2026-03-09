import pageNotFoundImage from "/404PageError.png";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <img
        src={pageNotFoundImage}
        alt="404 Error"
        className="error-page__img"
      ></img>

      <h1 className="error-page__title">
        SORRY, we couldn't find that page.
      </h1>
      <h1 className="error-page__subtitle">
        Try searching or go to{" "}
        <a
          className="error-page__link"
          href="/"
        >
          Medi-Hub's Homepage
        </a>
      </h1>
    </div>
  );
}
