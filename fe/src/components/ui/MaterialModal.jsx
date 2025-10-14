import React from "react";
import {
  Button,
  Card,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ModalRegistrasi() {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Card>
        <DialogHeader>Registrasi Berhasil</DialogHeader>
        <DialogBody>
          Selamat! Anda telah berhasil mendaftar. Silakan login untuk
          melanjutkan.
        </DialogBody>
        <DialogFooter>
          <Link
            onClick={handleOpen}
            to={"/login"}
            className="mr-1 w-full rounded-xl bg-green-400 py-1 text-center font-semibold text-white"
          >
            <span>Ok</span>
          </Link>
        </DialogFooter>
      </Card>
    </div>
  );
}
