import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";

import FormField from "../moleculs/FormField";
import Button from "../atoms/Button";

const UpdateProductModal = ({ open, handler, onClick, onSubmit, product }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [material, setMaterial] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDesc(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategory(product.category);
      setUnit(product.unit);
      setMaterial(product.material);
    }
  }, [product]);

  const validateNum = (num) => {
    const re = /^[0-9]+$/;
    return re.test(num);
  };

  const handleChangePrice = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (validateNum(value)) {
      setError("");
    } else if (value === "") {
      setError("");
    } else {
      setError("Input hanya boleh angka.");
      setPrice("");
    }
  };

  const handleChangeStock = (e) => {
    const value = e.target.value;
    setStock(value);
    if (validateNum(value)) {
      setError("");
    } else if (value === "") {
      setError("");
    } else {
      setError("Input hanya boleh angka.");
      setStock("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!name || !desc || !price || !stock || !category || !unit || !material) {
      setError("Tolong isi semua inputnya");
      setIsLoading(false);
      return;
    }

    const updatedProduct = {
      productID: product.productID, // Pastikan untuk menyertakan ID produk
      name,
      description: desc,
      price,
      stock,
      category,
      unit,
      material,
    };

    try {
      await onSubmit(updatedProduct);
    } catch (error) {
      setError("Terjadi kesalahan saat memperbarui produk.");
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { value: "UPPER", label: "UPPER" },
    { value: "SOLE", label: "SOLE" },
    { value: "INSOLE", label: "INSOLE" },
    { value: "SHOELACES", label: "SHOELACES" },
    { value: "HEEL", label: "HEEL" },
    { value: "TONGUE", label: "TONGUE" },
    { value: "EYELETS", label: "EYELETS" },
    { value: "TOE_CAP", label: "TOE_CAP" },
    { value: "QUARTER", label: "QUARTER" },
    { value: "LINING", label: "LINING" },
    { value: "PADDING", label: "PADDING" },
  ];

  const unitOptions = [
    { value: "METER", label: "METER" },
    { value: "KG", label: "KG" },
    { value: "PCS", label: "PCS" },
    { value: "ROLL", label: "ROLL" },
    { value: "PACK", label: "PACK" },
  ];

  return (
    <Dialog open={open} handler={handler}>
      <DialogHeader>Edit Product</DialogHeader>
      <DialogBody className="max-h-[400px] overflow-y-auto">
        {error && (
          <Typography variant="paragraph" color="red" className="mb-2">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id={"id"}
            type={"id"}
            name={"id"}
            label={"ID"}
            value={product?.productID}
            onChange={() => {}}
            classNameLabel={"block text-sm font-medium text-gray-900"}
            classNameInput={
              "bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
          />
          <FormField
            id={"name"}
            type={"name"}
            name={"name"}
            label={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            classNameLabel={"block text-sm font-medium text-gray-900"}
            classNameInput={
              "bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
          />
          <FormField
            id={"description"}
            type={"description"}
            name={"description"}
            label={"Description"}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            classNameLabel={"block text-sm font-medium text-gray-900"}
            classNameInput={
              "bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
          />
          <FormField
            id={"price"}
            type={"price"}
            name={"price"}
            label={"Price"}
            value={price}
            onChange={handleChangePrice}
            classNameLabel={"block text-sm font-medium text-gray-900"}
            classNameInput={
              "bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
          />
          <FormField
            id={"stock"}
            type={"stock"}
            name={"stock"}
            label={"Stock"}
            value={stock}
            onChange={handleChangeStock}
            classNameLabel={"block text-sm font-medium text-gray-900"}
            classNameInput={
              "bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
          />
          <FormField
            id={"category"}
            type={"select"}
            name={"category"}
            label={"Category"}
            value={category}
            options={categoryOptions}
            onChange={(value) => setCategory(value)}
            classNameLabel={"block text-sm font-medium text-gray-900"}
          />
          <FormField
            id={"unit"}
            type={"select"}
            name={"unit"}
            label={"Unit"}
            value={unit}
            options={unitOptions}
            onChange={(value) => setUnit(value)}
            classNameLabel={"block text-sm font-medium text-gray-900"}
          />
          <FormField
            id={"material"}
            type={"material"}
            name={"material"}
            label={"Material"}
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            classNameLabel={"block text-sm font-medium text-gray-900"}
            classNameInput={
              "bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button type="submit" onClick={handleSubmit} className="mr-1">
          {isLoading && <Spinner className="mr-1 inline-flex" color="blue" />}
          <span>Save</span>
        </Button>
        <Button onClick={onClick} className="mr-1">
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateProductModal;
