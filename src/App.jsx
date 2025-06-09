import { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./contextApi/AuthContext.jsx";
import {
  AdminRoute,
  GuestRoute,
  PrivateRoute,
} from "./utils/ProtectedRoutes.jsx";
import Spinner from "./ui/Loader.js";

// Lazy imports
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Login = lazy(() => import("./pages/Auth/Login"));
const CreateEvent = lazy(() => import("./pages/Create-Event/CreateEvent"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const EditEvent = lazy(() => import("./pages/Edit-Event/EditEvent"));
const SingleEvent = lazy(() => import("./pages/Single-Event/SingleEvent"));
const Home = lazy(() => import("./pages/Home/Home"));

const App = () => {
  const { myProfileApi } = useAuth();

  useEffect(() => {
    myProfileApi();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-white">
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            </GuestRoute>
          }
        />
        <Route
          path="/"
          element={
            <GuestRoute>
              <Suspense fallback={<Spinner />}>
                <Home />
              </Suspense>
            </GuestRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Suspense fallback={<Spinner />}>
                <DashboardLayout />
              </Suspense>
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="create-event"
            element={
              <AdminRoute>
                <Suspense fallback={<Spinner />}>
                  <CreateEvent />
                </Suspense>
              </AdminRoute>
            }
          />
          <Route
            path="single-event/:eventId"
            element={
              <AdminRoute>
                <Suspense fallback={<Spinner />}>
                  <SingleEvent />
                </Suspense>
              </AdminRoute>
            }
          />
          <Route
            path="edit-event/:eventId"
            element={
              <AdminRoute>
                <Suspense fallback={<Spinner />}>
                  <EditEvent />
                </Suspense>
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
