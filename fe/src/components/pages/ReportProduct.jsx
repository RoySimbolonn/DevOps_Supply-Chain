import React, { useEffect } from "react";
import useStore from "@/stores/OrderStore";
import { useParams } from "react-router-dom";

const ReportProduct = () => {
  const { id } = useParams();
  const { order, loading, error, fetchOrdersById } = useStore((state) => state);

  useEffect(() => {
    fetchOrdersById(`/api/orders/supplier/order`, id);
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg text-red-500">Order Not Found</div>
    );
  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-2xl font-bold">Detail Pesanan</h3>
      <p className="text-lg">
        ID Pesanan: <span className="font-semibold">{order?.orderID}</span>
      </p>
      <p className="text-lg">
        Status: <span className="font-semibold">{order?.status}</span>
      </p>
      <p className="text-lg">
        Jumlah: <span className="font-semibold">{order?.quantity}</span>
      </p>
      <p className="text-lg">
        Tanggal Dibuat:{" "}
        <span className="font-semibold">
          {new Date(order?.created_at).toLocaleString()}
        </span>
      </p>

      <h3 className="mb-4 mt-6 text-2xl font-bold">Produk</h3>
      <p className="text-lg">
        Nama Produk:{" "}
        <span className="font-semibold">{order?.product?.name}</span>
      </p>
      <p className="text-lg">
        Deskripsi:{" "}
        <span className="font-semibold">{order?.product?.description}</span>
      </p>
      <p className="text-lg">
        Harga:{" "}
        <span className="font-semibold">
          {order?.product?.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </span>
      </p>

      <h3 className="mb-4 mt-6 text-2xl font-bold">Pelanggan</h3>
      <p className="text-lg">
        Nama Pelanggan:{" "}
        <span className="font-semibold">{order?.customer?.username}</span>
      </p>
    </div>
  );
};

export default ReportProduct;
