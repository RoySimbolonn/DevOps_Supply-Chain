import React from "react";
import LoginForm from "../organisms/LoginForm";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logoZ4IN from "@/assets/logoZ4IN.png";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-BIRU p-4">
      <Card className="h-auto w-96">
        <div className="flex justify-center items-center p-4">
          <img
            src={logoZ4IN}
            alt="Logo Z4IN"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <CardBody className="pt-0">
          {/* Indikator CI/CD Testing */}
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-center">
            <Typography variant="small" className="font-semibold text-green-700">
              Version 2.0 - Updated CI CD 55
            </Typography>
          </div>
          
          <LoginForm />
          <Link to={"/register"}>
            <Typography
              variant="paragraph"
              className="cursor-pointer hover:underline"
            >
              Tidak Punya akun?
            </Typography>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;