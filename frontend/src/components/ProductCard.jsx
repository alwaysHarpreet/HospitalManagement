import React from "react";

const ProductCard = ({ order }) => {
  const { productImage, productName, size, price, status, date, isDelivered } =
    order;
  return (
    <div className="product-card">
      <div style={{flexShrink: 0}}>
        <img
          src={productImage}
          alt="Product"
          className="product-card__img"
        />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__name">{productName}</h3>
        <p className="product-card__size">size : {size}</p>
      </div>
      <p className="product-card__price">₹{price}</p>
      <div className="product-card__status">
        <p
          className={`product-card__status-text ${
            isDelivered ? "product-card__status-text--delivered" : "product-card__status-text--cancelled"
          }`}
        >
          {status} on {date}
        </p>
        <p className="product-card__status-desc">
          {isDelivered
            ? "Your item has been delivered"
            : "Your item has been cancelled"}
        </p>
        {isDelivered && (
          <button className="product-card__review-btn">
            Rate & Review Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
