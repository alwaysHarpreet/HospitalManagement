import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../../../constants";
import {
  SkeletonLoading,
  useLoading,
  Pagination,
} from "../../../import-export/ImportExport";

export default function ProductsByCategory() {
  const { id: category } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products per page
  const loading = useLoading(1000);

  useEffect(() => {
    // Filter products based on the category
    const filteredProducts = Products.filter(
      (product) => product.category === category
    );
    setProducts(filteredProducts);
  }, [category]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Capitalize the first letter of the category name
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section className="products-by-category">
      <div className="shop-section__header shop-section__header--inline">
        <h2 className="shop-section__title">
          {formattedCategory}
        </h2>
      </div>

      {/* Product cards section */}
      <div className="shop-section__grid">
        {loading ? (
          // Render skeleton loading effect for each product card
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoading key={index} type="product" />
          ))
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="shop-section__card"
            >
              <div className="shop-section__card-img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="shop-section__card-img"
                  loading="lazy"
                />
              </div>
              <h2 className="shop-section__card-name shop-section__card-name--mb">
                {product.name}
              </h2>
              <p className="products-by-category__product-info">{product.price}</p>
              <p className="products-by-category__product-desc">{product.description}</p>
            </div>
          ))
        ) : (
          <p className="products-by-category__no-products">
            No products found in this category.
          </p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / productsPerPage)}
        onPageChange={paginate}
      />
    </section>
  );
}
