import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { PresentationChartBarIcon, PowerIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AiFillDatabase } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import useAuthStore from "@/utils/authStore";

import logoZ4IN from "@/assets/logoZ4IN.png";

export function SidebarSupplier() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

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
      className="fixed flex h-full w-full max-w-[20rem] flex-col items-center bg-HIJAU p-4 text-white shadow-xl shadow-blue-gray-900/5"
    >
      <div className="mb-0 p-0">
        <img
          src={logoZ4IN}
          alt="Logo Z4IN"
          style={{ width: "auto", height: "120px" }}
          className=""
        />
      </div>
      <List className="text-white">
        <Link>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal">Dashboard</Typography>
          </ListItem>
        </Link>

        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className="group bg-transparent p-0 hover:text-black"
            selected={open === 2}
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-5 p-3"
            >
              <ListItemPrefix>
                <AiFillDatabase className="h-5 w-5 text-white group-hover:text-black" />
              </ListItemPrefix>
              <Typography className="w-full font-normal text-white group-hover:text-black">
                Master Data
              </Typography>
            </AccordionHeader>
          </ListItem>

          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to={"product"}>
                <ListItem className="text-white">
                  <ListItemPrefix>
                    <BsBoxSeam className="h-6 w-5" />
                  </ListItemPrefix>
                  Data Barang
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Link to={"transaction"}>
          <ListItem>
            <ListItemPrefix>
              <GrTransaction className="h-5 w-5" />
            </ListItemPrefix>
            Transaksi
          </ListItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <Link to={"/login"} onClick={logoutUser}>
          <ListItem>
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
