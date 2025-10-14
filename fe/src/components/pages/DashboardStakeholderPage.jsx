import React, { useState, useEffect } from "react";
import { GrTransaction } from "react-icons/gr";
import { MdLocalShipping, MdStore } from "react-icons/md";
import Cookies from "js-cookie";
import axiosInstance from "@/axiosInstance";

import MaterialChart from "@/components/ui/MaterialChart";

const DashboardStakeholderPage = () => {
  const [order, setOrder] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookies.get("access_token");

  useEffect(() => {
    const fetchDataTransaction = async () => {
      try {
        const response = await axiosInstance.get(`/api/orders/my-orders`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setOrder(response.data.data);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchDataSupplier = async () => {
      try {
        const response = await axiosInstance.get(`/api/products`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const uniqueSuppliers = new Set();
        response.data.data.forEach((product) => {
          uniqueSuppliers.add(product.supplier.username);
        });
        const uniqueSuppliersArray = Array.from(uniqueSuppliers);
        setSupplier(uniqueSuppliersArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchDataProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setProduct(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataTransaction();
    fetchDataSupplier();
    fetchDataProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-8 lg:mt-20">
      <h3 className="mb-2 text-2xl font-semibold">Dashboard</h3>

      {/* Card Start */}
      <div className="mb-2 flex flex-col items-center justify-center gap-4 lg:flex-row">
        {/* Card Transaction */}
        <div>
          <div className="border-slate-200 relative flex w-56 flex-col rounded-lg border bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-x-4">
                <GrTransaction size={24} />
                <h5 className="text-slate-800 text-xl font-semibold">
                  Transaksi
                </h5>
              </div>
              <div className="flex justify-center">
                <h3 className="text-slate-600 text-7xl font-light leading-normal">
                  {order.length}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Card Supplyer */}
        <div>
          <div className="border-slate-200 relative flex w-56 flex-col rounded-lg border bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <MdLocalShipping size={24} />
                <h5 className="text-slate-800 text-xl font-semibold">
                  Supplyer
                </h5>
              </div>
              <div className="flex justify-center">
                <h3 className="text-slate-600 text-7xl font-light leading-normal">
                  {supplier.length}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Card Product */}
        <div>
          <div className="border-slate-200 relative flex w-56 flex-col rounded-lg border bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-x-4">
                <MdStore size={24} />
                <h5 className="text-slate-800 text-xl font-semibold">
                  Product
                </h5>
              </div>
              <div className="flex justify-center">
                <h3 className="text-slate-600 text-7xl font-light leading-normal">
                  {product.length}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card End */}

      <h3 className="mb-4 mt-5 text-2xl font-semibold">Statistik Performa</h3>
      <MaterialChart />
    </div>
  );
};

export default DashboardStakeholderPage;
