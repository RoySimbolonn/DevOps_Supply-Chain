import { useEffect } from "react";
import { SidebarStakeHolder } from "@/components/ui/SidebarStakeholder.jsx";
import { NavStakeholder } from "@/components/ui/NavStakeholder.jsx";
import { useState } from "react";

const NavigationStakeholder = () => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  const handleMdScreen = () => {
    setIsMdScreen(window.innerWidth >= 1024);
  };
  useEffect(() => {
    handleMdScreen();
    window.addEventListener("resize", handleMdScreen);
    return () => window.removeEventListener("resize", handleMdScreen);
  }, []);

  return <div>{isMdScreen ? <SidebarStakeHolder /> : <NavStakeholder />}</div>;
};

export default NavigationStakeholder;
