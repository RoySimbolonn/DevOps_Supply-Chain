import React, { useState, useEffect } from "react";
import { Card, Typography, Spinner } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import FormField from "../moleculs/FormField";
import axiosInstance from "@/axiosInstance";
import { CircularPagination } from "../ui/CircularPagination";

const SupplierTableTransaction = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(5); // Jumlah item per halaman
  const [active, setActive] = useState(1); // Halaman aktif

  const token = Cookies.get("access_token");
  const userId = token ? jwtDecode(token).userID : null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/api/orders`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = response.data.data;

        // Filter orders based on userId
        const filteredOrders = data.filter(
          (order) => order.product.userID === userId,
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, userId]);

  const statusOptions = [
    { value: "PENDING", label: "PENDING" },
    { value: "ON_PROGRESS", label: "ON_PROGRESS" },
    { value: "SUCCESS", label: "SUCCESS" },
    { value: "REJECT", label: "REJECT" },
  ];

  const handleStatusChange = async (orderID, newStatus) => {
  setLoading(true);
  try {
    console.log("🔄 Updating status:", { orderID, newStatus });
    
    // Send update request
    const response = await axiosInstance.put(
      `/api/orders/status`,
      { orderID, status: newStatus },
      { headers: { Authorization: `${token}` } },
    );

    console.log("✅ Update response:", response.data);

    // Update local state
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order.orderID === orderID) {
          return { 
            ...order, 
            status: newStatus,
            qr_code: response.data.qrCodePath || order.qr_code // Update QR code jika ada
          };
        }
        return order;
      });
      console.log("✅ Orders updated:", updatedOrders);
      return updatedOrders;
    });

    // Optional: Show success message
    alert(`Status berhasil diubah menjadi ${newStatus}`);

  } catch (error) {
    console.error("❌ Error updating status:", error);
    console.error("❌ Error response:", error.response?.data);
    
    // Show error message
    alert(`Gagal mengubah status: ${error.response?.data?.message || error.message}`);
  } finally {
    setLoading(false);
  }
};

  // Hitung total halaman
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Ambil data untuk halaman saat ini
  const currentOrders = orders.slice(
    (active - 1) * itemsPerPage,
    active * itemsPerPage,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="blue" className="h-16 w-16" />;
      </div>
    );
  }

  return (
    <div className="">
      <Card className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-HIJAU">
              <th className="border-b border-HIJAU p-4">
                <Typography
                  variant="small"
                  color="HIJAU"
                  className="font-extrabold leading-none opacity-70"
                >
                  ID
                </Typography>
              </th>
              <th className="border-b border-HIJAU p-4">
                <Typography
                  variant="small"
                  color="HIJAU"
                  className="font-extrabold leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-HIJAU p-4">
                <Typography
                  variant="small"
                  color="HIJAU"
                  className="font-extrabold leading-none opacity-70"
                >
                  Product
                </Typography>
              </th>
              <th className="border-b border-HIJAU p-4">
                <Typography
                  variant="small"
                  color="HIJAU"
                  className="font-extrabold leading-none opacity-70"
                >
                  Quantity
                </Typography>
              </th>
              <th className="border-b border-HIJAU p-4">
                <Typography
                  variant="small"
                  color="HIJAU"
                  className="font-extrabold leading-none opacity-70"
                >
                  Status
                </Typography>
              </th>
              <th className="border-b border-HIJAU px-6 py-4">
                <Typography
                  variant="small"
                  color="HIJAU"
                  className="font-extrabold leading-none opacity-70"
                >
                  QR Code
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
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
              currentOrders.map((order, index) => (
                <tr key={index}>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.orderID}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.user.username}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.product.name}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.quantity}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <FormField
                      id={"status"}
                      type={"select"}
                      name={"status"}
                      value={order.status}
                      options={statusOptions}
                      onChange={(event) =>
                        handleStatusChange(order.orderID, event.target.value)
                      }
                      classNameSelect="w-full"
                    />
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <div className="flex items-center justify-center">
                      {order.qr_code ? (
                        <img src={order.qr_code} alt="" className="h-12 w-12" />
                      ) : (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          -
                        </Typography>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Kontrol Pagination */}
      <div className="mt-5">
        <CircularPagination
          active={active}
          setActive={setActive}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default SupplierTableTransaction;
