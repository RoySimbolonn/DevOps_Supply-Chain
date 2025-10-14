import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Button from "../atoms/Button";
import Cookies from "js-cookie";
import axiosInstance from "@/axiosInstance";

const TableTransaction = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookies.get("access_token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/api/orders/my-orders`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setOrders(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );
    if (!confirmDelete) return; // Jika tidak dikonfirmasi, keluar dari fungsi

    try {
      await axiosInstance.delete(`/api/orders/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.filter(
          (order) => order.orderID !== id,
        );
        return updatedOrders;
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      setError("Failed to delete the order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr >
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color=""
                className="font-normal leading-none opacity-70"
              >
                ID
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Product
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Quantity
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Status
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                QR Code
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                <Typography variant="small" color="red" className="font-normal">
                  DATA KOSONG
                </Typography>
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
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
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order.status}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50 p-4">
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
                </td>

                <td className="border-b border-blue-gray-50 p-4">
                  <Button onClick={() => handleDelete(order.orderID)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default TableTransaction;
