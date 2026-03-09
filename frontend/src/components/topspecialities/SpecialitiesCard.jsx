import React from "react";
import { SkeletonLoading, useLoading } from "../../import-export/ImportExport";

const SpecialitiesCard = ({ speciality }) => {
  const loading = useLoading(1000);
  if (loading || !speciality) return <SkeletonLoading type="speciality" />;

  return (
    <section className="speciality-card">
      {/* title */}
      <div className="speciality-card__title-wrap">
        <h2 className="speciality-card__title">
          {speciality.name}
        </h2>
      </div>

      {/* icon */}
      <div className="speciality-card__icon-wrap">
        <img
          src={speciality.icon}
          alt="speciality image"
          className="speciality-card__icon"
        />
      </div>

      {/* description */}
      <div className="speciality-card__desc-wrap">
        <p className="speciality-card__desc">
          {speciality.desc}
        </p>
      </div>

      <div className="speciality-card__symptoms-wrap">
        <p className="speciality-card__symptoms">
          {speciality.symptoms.join(", ")}
        </p>
      </div>
    </section>
  );
};

export default SpecialitiesCard;
