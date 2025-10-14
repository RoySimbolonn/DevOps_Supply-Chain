import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Collapse } from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import { NavLink, Link } from "react-router-dom";

import useAuthStore from "@/utils/authStore";

import { jwtDecode } from "jwt-decode";

export function NavStakeholder() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const { getToken, logoutUser } = useAuthStore();

  const token = getToken();
  const decodedToken = jwtDecode(token);

  const username = decodedToken.username;
  const email = decodedToken.email;

  const navList = (
    <ul className="mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" color="blue-gray" className="font-semibold">
        <NavLink
          to={"/stakeholder/dashboard"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-lg bg-blue-gray-200"
              : "flex items-center"
          }
        >
          <ListItem className="focus:bg-inherit">Dashboard</ListItem>
        </NavLink>
      </Typography>

      <Typography as="li" color="blue-gray" className="font-semibold">
        <NavLink
          to={"/stakeholder/transaction"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-lg bg-blue-gray-200"
              : "flex items-center"
          }
        >
          <ListItem className="focus:bg-inherit">Transaksi</ListItem>
        </NavLink>
      </Typography>

      <Typography as="li" color="blue-gray" className="font-semibold">
        <NavLink
          to={"/stakeholder/report"}
          className={({ isActive }) =>
            isActive
              ? "flex items-center rounded-lg bg-blue-gray-200"
              : "flex items-center"
          }
        >
          <ListItem className="focus:bg-inherit">Laporan</ListItem>
        </NavLink>
      </Typography>

      <div className="flex items-center gap-x-1">
        <Link
          className="w-full rounded-md bg-blue-gray-900 py-1 text-center"
          to={"/login"}
          onClick={logoutUser}
        >
          <span>Log out</span>
        </Link>
      </div>
    </ul>
  );

  return (
    <div className="">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to={"/"}>
            <Typography className="mr-4 cursor-pointer py-1.5 font-bold">
              Z4IN
            </Typography>
          </Link>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Log In</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Sign in</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <div className="flex items-center justify-between gap-4 text-blue-gray-900">
            <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
              {username}
            </Typography>
            <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
              {email}
            </Typography>
          </div>
          {navList}
        </Collapse>
      </Navbar>
    </div>
  );
}
