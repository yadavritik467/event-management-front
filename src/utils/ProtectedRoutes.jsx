import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contextApi/AuthContext";
import Spinner from "../ui/Loader";

export const PrivateRoute = ({ children }) => {
  const { userState } = useAuth();
  const [waitOver, setWaitOver] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setWaitOver(true), 1500);
    return () => clearTimeout(id); // clean up on unmount
  }, [1500]);
  useEffect(() => {
    if (userState) setWaitOver(true);
  }, [userState]);

  if (!waitOver) return <Spinner/>;

  return userState ? children : <Navigate to="/" replace />;
};

export const GuestRoute = ({ children }) => {
  const { userState, userLoading } = useAuth();

  if (userLoading) return <Spinner/>;
  else return !userState ? children : <Navigate to="/dashboard" replace />;
};
export const AdminRoute = ({ children }) => {
  const { userState } = useAuth();
  const [waitOver, setWaitOver] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setWaitOver(true), 1500);
    return () => clearTimeout(id); // clean up on unmount
  }, [1500]);
  useEffect(() => {
    if (userState) setWaitOver(true);
  }, [userState]);

  if (!waitOver) return <Spinner/>;

  return userState?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/dashboard" replace />
  );
};
