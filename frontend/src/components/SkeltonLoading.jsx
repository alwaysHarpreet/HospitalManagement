import React from "react";

const SkeletonLoading = ({ type }) => {
  switch (type) {
    case "speciality":
      return (
        <div className="skeleton skeleton-speciality">
          <div className="skeleton-speciality__inner">
            {/* title Skeleton */}
            <div className="skeleton-speciality__title">
              <div className="skeleton-speciality__title-bar"></div>
            </div>

            {/* icon Skeleton */}
            <div className="skeleton-speciality__icon-wrap">
              <div className="skeleton-speciality__icon"></div>
            </div>

            {/* description Skeleton */}
            <div className="skeleton-speciality__desc">
              <div className="skeleton-speciality__desc-bar"></div>
            </div>

            {/* symptoms Skeleton */}
            <div className="skeleton-speciality__symptoms">
              <div className="skeleton-speciality__symptoms-bar"></div>
            </div>
          </div>
        </div>
      );

    case "category":
      return (
        <div className="skeleton skeleton-category">
          <div className="skeleton-category__img"></div>
          <div className="skeleton-category__name"></div>
        </div>
      );
    case "product":
      return (
        <div className="skeleton skeleton-product">
          <div className="skeleton-product__img"></div>
          <div className="skeleton-product__name"></div>
          <div className="skeleton-product__line skeleton-product__line--half"></div>
          <div className="skeleton-product__line skeleton-product__line--two-thirds"></div>
        </div>
      );
    default:
      return (
        <div className="skeleton skeleton-default">
          {/* Avatar */}
          <div className="skeleton-default__avatar"></div>

          {/* Details */}
          <div className="skeleton-default__lines">
            <div className="skeleton-default__line skeleton-default__line--75"></div>
            <div className="skeleton-default__line skeleton-default__line--50"></div>
            <div className="skeleton-default__line skeleton-default__line--33"></div>
            <div className="skeleton-default__line skeleton-default__line--100"></div>
            <div className="skeleton-default__line skeleton-default__line--66"></div>
          </div>

          {/* Actions */}
          <div className="skeleton-default__actions">
            <div className="skeleton-default__action"></div>
            <div className="skeleton-default__action"></div>
          </div>
        </div>
      );
  }
};

export default SkeletonLoading;
