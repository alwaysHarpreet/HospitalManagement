import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../../constants";

export default function ShopByBrand() {
  return (
    <section className="shop-section">
      <div className="shop-section__header">
        <h2 className="shop-section__title">
          Shop by Brand
        </h2>
      </div>

      {/* cards section */}
      <div className="shop-section__grid">
        {Category.map((category, index) => (
          <Link key={index} to={`/shop-by-category${category.Url}`}>
            <div className="shop-section__card">
              {/* image container */}
              <div className="shop-section__card-img-wrap">
                <img
                  src={category.image}
                  alt={category.name}
                  className="shop-section__card-img"
                  loading="lazy"
                />
              </div>
              <h2 className="shop-section__card-name">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
