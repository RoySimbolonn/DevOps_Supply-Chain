import { useEffect } from "react";
import { SidebarSupplier } from "../ui/SidebarSupplier";
import { NavSupplier } from "../ui/NavSupplier";
import { useState } from "react";

const NavigationSupplier = () => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  const handleMdScreen = () => {
    setIsMdScreen(window.innerWidth >= 1024);
  };
  useEffect(() => {
    handleMdScreen();
    window.addEventListener("resize", handleMdScreen);
    return () => window.removeEventListener("resize", handleMdScreen);
  }, []);

  return <div>{isMdScreen ? <SidebarSupplier /> : <NavSupplier />}</div>;
};

export default NavigationSupplier;
