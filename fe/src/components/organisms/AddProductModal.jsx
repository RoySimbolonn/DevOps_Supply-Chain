import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import FormField from "../moleculs/FormField";
import Button from "../atoms/Button";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const UpdateProductModal = ({ open, handler, onClick, onSubmit }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [material, setMaterial] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    const token = Cookies.get("access_token");
    const userId = jwtDecode(token).userID; // Dekode token untuk mendapatkan userID

    const newProduct = {
      name,
      description: desc,
      price,
      stock,
      category,
      unit,
      material,
      userID: userId,
    };

    try {
      await onSubmit(newProduct);
    } catch (error) {
      setError("Terjadi kesalahan saat memperbarui produk.");
    } finally {
      setIsLoading(false);
      setName("");
      setDesc("");
      setPrice("");
      setStock("");
      setCategory(categoryOptions[0].value); // Reset to the first category
      setUnit(unitOptions[0].value); // Reset to the first unit
      setMaterial("");
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

  useEffect(() => {
    if (categoryOptions.length > 0 && !category) {
      setCategory(categoryOptions[0].value);
    }

    if (unitOptions.length > 0 && !unit) {
      setUnit(unitOptions[0].value);
    }
  }, [categoryOptions, unitOptions, category, unit]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Dialog open={open} handler={handler}>
      <DialogHeader>Tambah Product</DialogHeader>
      <DialogBody className="max-h-[400px] overflow-y-auto">
        {error && (
          <Typography variant="paragraph" color="red" className="mb-2">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            onChange={(event) => setCategory(event.target.value)}
            classNameLabel={"block text-sm font-medium text-gray-900"}
          />
          <FormField
            id={"unit"}
            type={"select"}
            name={"unit"}
            label={"Unit"}
            value={unit}
            options={unitOptions}
            onChange={(event) => setUnit(event.target.value)}
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
