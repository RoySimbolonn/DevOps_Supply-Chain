import React from "react";
import LoginForm from "../organisms/LoginForm";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logoZ4IN from "@/assets/logoZ4IN.png";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-BIRU p-4">
      <Card className="h-auto w-96">
        {/* Banner Auto Update Test */}
        <div style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '12px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px'
        }}>
          🚀 CI/CD Auto Update Works! - v2.0
        </div>
        
        <div className="flex justify-center items-center p-4">
          <img
            src={logoZ4IN}
            alt="Logo Z4IN"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <CardBody className="pt-0">
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