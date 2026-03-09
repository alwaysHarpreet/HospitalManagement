import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../../constants";
import {
  SkeletonLoading,
  useLoading,
} from "../../../import-export/ImportExport";

export default function ShopByCategory() {
  const loading = useLoading(1000);

  return (
    <section className="shop-section">
      <div className="shop-section__header shop-section__header--inline">
        <h2 className="shop-section__title">
          Shop by Category
        </h2>
      </div>

      {/* cards section */}
      <div className="shop-section__grid">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoading key={index} type="category" />
            ))
          : Category.map((category, index) => (
              <Link
                key={index}
                to={`/medicines/shop_by_category${category.Url.toLowerCase()}`}
              >
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
                  <h2 className="shop-section__card-name shop-section__card-name--mb">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
