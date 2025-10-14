import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import Cookies from "js-cookie";
import axiosInstance from "@/axiosInstance";

const MaterialChart = () => {
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
      const token = Cookies.get("access_token");
      try {
        const response = await axiosInstance.get(`/api/orders/my-orders`, {
          headers: {
            Authorization: `${token}`,
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
    <Card>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default MaterialChart;
