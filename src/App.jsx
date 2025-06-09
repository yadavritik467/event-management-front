import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAuth } from "./contextApi/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import SideBar from "./layouts/SideBar.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import MyEvents from "./pages/MyEvents.jsx";
import SingleEvent from "./pages/SingleEvent.jsx";

const App = () => {
  const { myProfileApi } = useAuth();
  useEffect(() => {
    myProfileApi();
  }, []);
  return (
    <div className="w-full h-[100vh] bg-white">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="single-event/:eventId" element={<SingleEvent />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
