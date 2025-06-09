import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div
      className="grid grid-cols-12 h-[100vh]"
    >
      <div className="col-span-3">
        <SideBar />
      </div>

      <div className={`col-span-9 h-[100vh]  overflow-y-scroll`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
