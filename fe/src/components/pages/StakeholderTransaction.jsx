import React from "react";
import TransactionForm from "../organisms/TransactionForm";
import { Card, CardBody, Typography } from "@material-tailwind/react";
const StakeholderTransaction = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card>
        <CardBody>
          <Typography color="blue-gray" variant="h5" className="mb-5">
            Order
          </Typography>
          <TransactionForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default StakeholderTransaction;
