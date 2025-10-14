import React from "react";
import TableProduct from "../organisms/TableProduct";

const ProductPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-6xl p-4">
        <TableProduct />
      </div>
    </div>
  );
};

export default ProductPage;
