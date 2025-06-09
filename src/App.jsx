import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./contextApi/AuthContext.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Login from "./pages/Auth/Login.jsx";
import CreateEvent from "./pages/Create-Event/CreateEvent.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import EditEvent from "./pages/Edit-Event/EditEvent.jsx";
import SingleEvent from "./pages/Single-Event/SingleEvent.jsx";
import Home from "./pages/Home/Home.jsx";


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
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="single-event/:eventId" element={<SingleEvent />} />
          <Route path="edit-event/:eventId" element={<EditEvent />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
