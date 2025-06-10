import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useState } from "react";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="w-[100vw] overflow-auto flex h-[100vh]">
      <div
        className={`${
          isMobileOpen ? "w-[300px]" : "w-[0%]"
        }  lg:w-[25%] h-[100vh] lg:block`}
      >
        <SideBar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>

      <div
        className={`${
          isMobileOpen ? "w-[75%]" : "w-full"
        }   lg:w-[75%] lg:col-span-9  h-[100vh]  overflow-y-scroll`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
