import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import useStore from "@/stores/OrderStore";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MaterialPie = () => {
  const { history, fetchHistory } = useStore((state) => state);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchHistory(`/api/orders/history`);
  }, [fetchHistory]);

  useEffect(() => {
    const quantityMap = {};
    history.forEach((item) => {
      const productID = item.product.productID;
      const quantity = item.quantity;

      if (quantityMap[productID]) {
        quantityMap[productID].quantity += quantity;
      } else {
        quantityMap[productID] = {
          name: item.product.name,
          quantity: quantity,
        };
      }
    });

    const newSeries = [];
    const newLabels = [];

    for (const productID in quantityMap) {
      newSeries.push(quantityMap[productID].quantity);
      newLabels.push(quantityMap[productID].name);
    }

    setSeries(newSeries);
    setLabels(newLabels);
  }, [history]);

  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: series,
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
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
      labels: labels,
    },
  };
  return (
    <Card>
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
            Statistik Stok Transaksi
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default MaterialPie;
