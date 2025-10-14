import React, { useState } from "react";
import FormField from "../moleculs/FormField";
import Button from "../atoms/Button";

import { jwtDecode } from "jwt-decode";
import useAuthStore from "@/utils/authStore";
import { Typography } from "@material-tailwind/react";

import axiosInstance from "@/axiosInstance";

import { Spinner } from "@material-tailwind/react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = useAuthStore((state) => state.loginUser);

  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(username);
  };

  const sanitizeInput = (input) => {
    // Menghapus tag HTML
    return input.replace(/<\/?[^>]+(>|$)/g, ""); // Menghapus semua tag HTML
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Username dan password harus diisi.");
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

    // Sanitasi input
    const cleanUsername = sanitizeInput(username);
    const cleanPassword = sanitizeInput(password);

    try {
      const response = await axiosInstance.post(`/api/auth/login`, {
        username: cleanUsername,
        password: cleanPassword,
      });

      const token = response.data.data.token;
      const decodeToken = jwtDecode(token);
      const role = decodeToken.role;

      loginUser(token);

      if (role === "STAKEHOLDER") {
        window.location.href = "/stakeholder";
      } else {
        window.location.href = "/supplier";
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Login Failed");
        console.log(error.response.data.error);
      } else {
        setError(error.message || "Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
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
        classNameLabel={"block text-sm font-medium text-gray-900"}
        classNameInput={
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        }
      />
      <FormField
        id={"password"}
        type={"password"}
        name={"password"}
        label={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        classNameLabel={"block text-sm font-medium text-gray-900"}
        classNameInput={
          "text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        }
      />

      <Button
        type={"submit"}
        className={


          "text-md relative mb-2 me-2 mt-4 w-full rounded-lg border border-gray-300 bg-blue-gray-700 px-5 py-2.5 font-medium text-white hover:bg-blue-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100"

        }
      >
        Login
        {loading && (
          <Spinner className="absolute right-4 inline-flex" color="blue" />
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
