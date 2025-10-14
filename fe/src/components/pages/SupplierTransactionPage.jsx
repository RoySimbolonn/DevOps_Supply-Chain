import React from "react";
import SupplierTableTransaction from "../organisms/SupplierTableTransaction";

const SupplierTransactionPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-BIRU">
      <div className="w-full px-5 lg:pt-40">
        <SupplierTableTransaction />
      </div>
    </div>
  );
};

export default SupplierTransactionPage;
