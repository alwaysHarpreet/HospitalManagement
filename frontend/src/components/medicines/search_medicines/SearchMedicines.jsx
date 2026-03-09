import React from "react";

export default function SearchMedicines() {
  return (
    <section className="search-medicines">
      <h1 className="search-medicines__title">
        Buy Medicines and Essentials
      </h1>
      <div className="search-medicines__bar">
        <div className="search-medicines__input-wrap">
          <div className="search-medicines__icon-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{width: '1.5rem', height: '1.5rem'}}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            // onChange={(event) => setSearch(event.target.value)}
            className="search-medicines__input"
            type="text"
            id="search"
            placeholder="Search medicines.."
          />
        </div>
      </div>
    </section>
  );
}
