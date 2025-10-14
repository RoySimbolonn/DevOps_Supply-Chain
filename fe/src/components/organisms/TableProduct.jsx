import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Button from "../atoms/Button";
import Cookies from "js-cookie";
import UpdateProductModal from "./UpdateProductModal";
import AddProductModal from "./AddProductModal";
import { jwtDecode } from "jwt-decode";
import { renderTableRow } from "@/utils/renderTableRow";
import axiosInstance from "@/axiosInstance";
import { CircularPagination } from "../ui/CircularPagination";
import { Spinner } from "@material-tailwind/react";

const TableProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [itemsPerPage] = useState(5); // Jumlah item per halaman
  const [active, setActive] = useState(1); // Halaman aktif

  const token = Cookies.get("access_token");
  const userId = token ? jwtDecode(token).userID : null;

  // Fungsi untuk membuka modal dan mengatur produk yang dipilih
  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = async (productID) => {
    try {
      await axiosInstance.delete(`/api/products/${productID}`, {
        headers: { Authorization: `${token}` },
      });
      setProducts((prev) =>
        prev.filter((item) => item.productID !== productID),
      );
    } catch (error) {
      setError("Error deleting product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Mengambil data produk dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/products/user/${userId}`,
          {
            headers: { Authorization: `${token}` },
          },
        );
        setProducts(response.data.data);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, token]);

  // Fungsi untuk memperbarui produk
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axiosInstance.put(
        `/api/products/${selectedProduct.productID}`,
        updatedProduct,
        { headers: { Authorization: `${token}` } },
      );
      setProducts((prev) =>
        prev.map((item) =>
          item.productID === selectedProduct.productID
            ? { ...item, ...updatedProduct }
            : item,
        ),
      );
    } catch (error) {
      setError("Error updating product: " + error.message);
    } finally {
      handleClose();
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axiosInstance.post(`/api/products`, newProduct, {
        headers: { Authorization: `${token}` },
      });
      setProducts((prev) => [...prev, response.data.data]);
    } catch (error) {
      setError("Error adding product: " + error.message);
    } finally {
      handleCloseAdd();
    }
  };

  // Hitung total halaman
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Ambil data untuk halaman saat ini
  const currentProducts = products.slice(
    (active - 1) * itemsPerPage,
    active * itemsPerPage,
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner color="blue" className="h-16 w-16" />
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={handleOpenAdd}
        className={
          "mb-4 rounded-md bg-HIJAU px-2 py-1 font-semibold text-white"
        }
      >
        TAMBAH BARANG
      </Button>
      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-HIJAU">
              {[
                "ID",
                "Name",
                "Description",
                "Price",
                "Stock",
                "Category",
                "Unit",
                "Material",
                "Action",
              ].map((header) => (
                <th key={header} className="border-b border-HIJAU p-4">
                  <Typography
                    variant="small"
                    color="HIJAU"
                    className="font-extrabold leading-none opacity-70"
                  >
                    {header}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  <Typography
                    variant="small"
                    color="red"
                    className="font-normal"
                  >
                    DATA KOSONG
                  </Typography>
                </td>
              </tr>
            ) : (
              currentProducts.map((item) =>
                renderTableRow(item, handleOpen, handleDeleteProduct),
              )
            )}
          </tbody>
        </table>

        <AddProductModal
          open={openAdd}
          handler={handleCloseAdd}
          onClick={handleCloseAdd}
          onSubmit={handleAddProduct}
        />
        <UpdateProductModal
          open={open}
          handler={handleClose}
          onClick={handleClose}
          product={selectedProduct}
          onSubmit={handleUpdateProduct}
        />
      </Card>
      {/* Kontrol Pagination */}
      <div className="mt-5">
        <CircularPagination
          active={active}
          setActive={setActive}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default TableProduct;
