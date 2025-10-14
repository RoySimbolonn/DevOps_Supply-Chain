import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { PresentationChartBarIcon, PowerIcon } from "@heroicons/react/24/solid";

import { GrTransaction } from "react-icons/gr";
import { HiDocumentReport } from "react-icons/hi";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import useAuthStore from "@/utils/authStore";

import logoZ4IN from "@/assets/logoZ4IN.png";

export function SidebarStakeHolder() {
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");

    const disableScroll = (event) => {
      event.preventDefault();
    };

    sidebar.addEventListener("wheel", disableScroll, { passive: false });

    return () => {
      sidebar.removeEventListener("wheel", disableScroll);
    };
  }, []);

  const logoutUser = useAuthStore((state) => state.logoutUser);

  return (
    <div
      id="sidebar"
      className="fixed h-full w-full max-w-[20rem] bg-HIJAU p-4 shadow-xl shadow-blue-gray-900/5"
    >
      <div className="mb-0 p-0 flex justify-center item-c">
        <img
          src={logoZ4IN}
          alt="Logo Z4IN"
          style={{ width: "auto", height: "120px" }}
        />
      </div>
      <List className="ml-2">
        <Link>
          <ListItem className="group">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 text-white group-hover:text-black" />
            </ListItemPrefix>
            <Typography
              color="white"
              className="mr-auto font-normal group-hover:text-black"
            >
              Dashboard
            </Typography>
          </ListItem>
        </Link>
        <Link to={"/stakeholder/transaction"}>
          <ListItem className="group text-white hover:text-black">
            <ListItemPrefix>
              <GrTransaction className="h-5 w-5 text-white group-hover:text-black" />
            </ListItemPrefix>
            Transaksi
          </ListItem>
        </Link>
        <Link to={"/stakeholder/report"}>
          <ListItem className="group text-white hover:text-black">
            <ListItemPrefix>
              <HiDocumentReport className="h-5 w-5" />
            </ListItemPrefix>
            Laporan
          </ListItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <Link to={"/login"} onClick={logoutUser}>
          <ListItem className="group text-white hover:text-black">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
