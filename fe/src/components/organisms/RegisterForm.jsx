import React, { useState, useEffect } from "react";
import FormField from "../moleculs/FormField";
import Button from "../atoms/Button";
import { ModalRegistrasi } from "../ui/MaterialModal";
import { Typography } from "@material-tailwind/react";
import axiosInstance from "@/axiosInstance";

import { Spinner } from "@material-tailwind/react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      setError("Tolong isi semua inputnya");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan Confirm Password harus sama.");
      setLoading(false);
      return;
    }

    if (!validateUsername(username)) {
      setError(
        "Username harus terdiri dari 3-20 karakter, hanya huruf, angka, dan underscore.",
      );
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Format email tidak valid.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/auth/register`, {
        username,
        email,
        password,
        role,
      });

      {
        response.data.message === "Register successfully" && setShowModal(true);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: "STAKEHOLDER", label: "Stakeholder" },
    { value: "SUPPLIER", label: "Supplier" },
  ];

  // Mengambil role index pertama
  useEffect(() => {
    if (roleOptions.length > 0 && !role) {
      setRole(roleOptions[0].value); // Set to the first role only if role is empty
    }
  }, [roleOptions, role]);

  return (
    <>
      {showModal && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-black/80">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ModalRegistrasi />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {error && (
          <Typography variant="paragraph" color="red" className="mb-2">
            {error}
          </Typography>
        )}
        <FormField
          id={"username"}
          type={"username"}
          name={"username"}
          label={"Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          classNameLabel={
            "block text-sm font-medium text-gray-900  inline-flex"
          }
          classNameInput={
            "bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          }
        />

        <FormField
          id={"email"}
          type={"email"}
          name={"email"}
          label={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          classNameLabel={"block text-sm font-medium text-gray-900 inline-flex"}
          classNameInput={
            "bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          }
        />

        <FormField
          id={"role"}
          type={"select"}
          name={"role"}
          label={"Role"}
          value={role}
          options={roleOptions}
          onChange={(event) => setRole(event.target.value)}
          classNameLabel={"block text-sm font-medium text-gray-900 inline-flex"}
          classNameSelect={"mb-2"}
        />

        <FormField
          id={"password"}
          type={"password"}
          name={"password"}
          label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          classNameLabel={"block text-sm font-medium text-gray-900 inline-flex"}
          classNameInput={
            "text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          }
        />

        <FormField
          id={"confirmPassword"}
          type={"confirmPassword"}
          name={"confirmPassword"}
          label={"Confirm Password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          classNameLabel={"block text-sm font-medium text-gray-900 inline-flex mt-2"}
          classNameInput={
            "text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          }
        />

        <Button
          type={"submit"}
          className={

            "relative mb-2 me-2 mt-4 w-full rounded-lg border border-gray-300 bg-blue-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100"

          }
        >
          Register
          {loading && (
            <Spinner className="absolute right-4 inline-flex" color="blue" />
          )}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
