import React from "react";
import RegisterForm from "../organisms/RegisterForm";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logoZ4IN from "@/assets/logoZ4IN.png";

const RegisterPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-BIRU p-2">
      <Card className="mt-16 h-auto w-96">
        <div className="flex items-center justify-center p-4">
          <img
            src={logoZ4IN}
            alt="Logo Z4IN"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <CardBody className="pt-0">
          <RegisterForm />
          <Link to={"/login"}>
            <Typography
              variant="paragraph"
              className="cursor-pointer hover:underline"
            >
              Punya akun?
            </Typography>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterPage;
