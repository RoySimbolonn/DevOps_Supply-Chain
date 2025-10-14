import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";
import axios from "axios";
import useAuthStore from "@/utils/authStore";
import axiosInstance from "@/axiosInstance";

const MaterialChartSupplier = () => {
  const [transactions, setTransactions] = useState({
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = useAuthStore.getState().getToken();

        const response = await axiosInstance.get(`/api/orders/history`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        const orders = response.data.data;
        countTransactions(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const countTransactions = (orders) => {
      const monthlyCounts = {
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      };

      orders.forEach((order) => {
        const month = new Date(order.updated_at).toLocaleString("default", {
          month: "short",
        });
        if (monthlyCounts[month] !== undefined) {
          monthlyCounts[month] += 1; // Tambahkan 1 untuk setiap order
        }
      });

      setTransactions(monthlyCounts);
    };

    fetchOrders();
  }, []);

  // Konfigurasi grafik
  const chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Transactions",
        data: Object.values(transactions),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <Card className="mb-6">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Statistik Performa Transaksi Sukses
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default MaterialChartSupplier;
