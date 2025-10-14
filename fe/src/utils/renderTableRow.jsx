// utils/tableRowRenderer.js
import { Typography } from "@material-tailwind/react";
import Button from "@/components/atoms/Button";

// Fungsi untuk merender baris tabel
export const renderTableRow = (item, handleOpen, handleDeleteProduct) => {
  const {
    productID,
    name,
    description,
    price,
    stock,
    category,
    unit,
    material,
  } = item;

  return (
    <tr key={productID}>
      {[
        productID || "N/A",
        name || "N/A",
        description || "N/A",
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price) || "N/A",
        stock || "N/A",
        category || "N/A",
        unit || "N/A",
        material || "N/A",
      ].map((value, index) => (
        <td key={index} className="border-b border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {value}
          </Typography>
        </td>
      ))}
      <td className="flex gap-4 border-b border-blue-gray-50 p-4">
        <Button onClick={() => handleOpen(item)}>Edit</Button>
        <Button onClick={() => handleDeleteProduct(productID)}>Delete</Button>
      </td>
    </tr>
  );
};
