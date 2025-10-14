import React, { useState, useEffect } from "react";
import FormField from "../moleculs/FormField"; // Pastikan jalur ini benar
import Button from "../atoms/Button"; // Pastikan jalur ini benar
import Cookies from "js-cookie";
import { Typography } from "@material-tailwind/react";
import axiosInstance from "@/axiosInstance";

import { Spinner } from "@material-tailwind/react";

const TransactionForm = () => {
  const [supplier, setSupplier] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/products`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const responseData = response.data.data;

        // Pastikan ada data yang diterima
        if (!responseData || responseData.length === 0) {
          setError("Tidak ada data produk tersedia");
          return;
        }

        const uniqueSuppliers = new Set();
        const optionsDataSupplier = [];

        responseData.forEach((response) => {
          const userID = String(response.userID);
          const username = response.supplier.username;

          if (!uniqueSuppliers.has(userID)) {
            uniqueSuppliers.add(userID);
            optionsDataSupplier.push({
              value: userID,
              label: username,
            });
          }
        });

        setSupplierOptions(optionsDataSupplier);

        // Set supplier pertama sebagai default
        if (optionsDataSupplier.length > 0) {
          const firstSupplier = optionsDataSupplier[0].value;
          setSupplier(firstSupplier);

          // Filter produk untuk supplier pertama
          const supplierProducts = responseData.filter(
            (product) => String(product.userID) === firstSupplier,
          );

          const optionsDataProduct = supplierProducts.map((product) => ({
            value: product.productID,
            label: product.name,
          }));

          setProductOptions(optionsDataProduct);

          // Set produk pertama sebagai default
          if (optionsDataProduct.length > 0) {
            setProduct(optionsDataProduct[0].value);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Gagal memuat data supplier dan produk");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchProducts = async (selectedSupplier, responseData) => {
    try {
      // Filter produk berdasarkan supplier yang dipilih
      const filteredProducts = responseData.filter(
        (product) => String(product.userID) === selectedSupplier,
      );

      const optionsDataProduct = filteredProducts.map((product) => ({
        value: product.productID,
        label: product.name,
      }));

      setProductOptions(optionsDataProduct);

      // Set produk pertama sebagai default saat supplier berubah
      if (optionsDataProduct.length > 0) {
        setProduct(optionsDataProduct[0].value);
      }
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      setError("Gagal memuat data produk");
    }
  };

  const handleSupplierChange = async (event) => {
    const selectedSupplier = event.target.value;
    setSupplier(selectedSupplier);
    setProduct(""); // Reset product when supplier changes

    if (selectedSupplier) {
      try {
        const response = await axiosInstance.get(`/api/products`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const responseData = response.data.data;

        // Ambil produk untuk supplier yang dipilih
        await fetchProducts(selectedSupplier, responseData);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setProductOptions([]);
      console.log("No supplier selected");
    }
  };

  console.log("selectedSupplier", supplier);

  const validateQuantity = (quantity) => {
    const re = /^[0-9]+$/;
    return re.test(quantity);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    if (validateQuantity(value)) {
      setError("");
    } else {
      setError("Input hanya boleh angka.");
      setQuantity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/orders`,
        {
          userID: Number(supplier),
          productID: Number(product),
          quantity: Number(quantity),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        },
      );
      if (response.data.message === "Order created successfully") {
        window.location.href = "/stakeholder/report";
      }
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengirim pesanan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Typography variant="paragraph" color="red" className="mb-2">
          {error}
        </Typography>
      )}
      {loading ? (
        <p>Memuat supplier...</p>
      ) : (
        <>
          <FormField
            label="Supplier"
            type="select"
            name="transactionName"
            options={supplierOptions}
            value={supplier}
            onChange={handleSupplierChange}
            classNameLabel={"block text-sm font-medium text-gray-900 mt-2"}
          />
          <FormField
            label="Product"
            type="select"
            name="transactionName"
            options={productOptions}
            value={product}
            onChange={(event) => {
              setProduct(event.target.value);
            }}
            disabled={productOptions.length === 0}
            classNameLabel={"block text-sm font-medium text-gray-900 mt-2"}
          />
          <FormField
            label="Kuantitas"
            type="text"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            classNameLabel={"block text-sm font-medium text-gray-900 mt-2"}
            classNameInput={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
          />
        </>
      )}
      <Button
        type={"submit"}
        className={
          "relative mb-2 me-2 mt-4 w-full rounded-lg border border-gray-300 bg-blue-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100"
        }
      >
        Order
        {loading && (
          <Spinner className="absolute right-4 inline-flex" color="blue" />
        )}
      </Button>
    </form>
  );
};

export default TransactionForm;
