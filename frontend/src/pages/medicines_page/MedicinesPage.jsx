import React from "react";

import {
  SearchMedicines,
  ShopByCategory,
  ShopByBrand,
  HotSellers,
  ShopByDiscount,
} from "../../import-export/ImportExport";

function MedicinesPage() {
  return (
    <main className="medicines-page">
      <SearchMedicines />
      <section className="medicines-page__inner">
        <ShopByCategory />
        <ShopByBrand />
        <HotSellers />
        {/* Banners */}
        <ShopByDiscount />
      </section>
    </main>
  );
}
export default MedicinesPage;
