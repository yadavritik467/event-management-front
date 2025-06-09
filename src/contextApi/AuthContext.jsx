import { createContext, useContext, useState } from "react";
import axiosInstance from "../interceptor/interceptor";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState(null);

  const signupApi = async (userNameOrEmail, password) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/auth/signup`, {
        userNameOrEmail,
        password,
      });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const loginApi = async (userNameOrEmail, password,togglerFunc) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/auth/login`, {
        userNameOrEmail,
        password,
      });
      if (data) {
        await myProfileApi();
      }
      setLoading(false);
      return data;
    } catch (error) {
      if (error.status === 404) {
        togglerFunc();
      }
      setLoading(false);
      console.log("error", error);
    }
  };

  const logoutApi = async () => {
    try {
      const { data } = await axiosInstance.post(`/auth/logout`);
      setUserState(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  const myProfileApi = async () => {
    try {
      const { data } = await axiosInstance.get(`/auth/myProfile`);
      setUserState(data?.user);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Not logged in");
      } else {
        console.log("error", error);
      }
    }
  };

  const all_states = {
    loading,
    userState,
  };

  const all_api_controllers = {
    signupApi,
    loginApi,
    myProfileApi,
    logoutApi,
  };

  return (
    <AuthContext.Provider
      value={{
        ...all_states,
        ...all_api_controllers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
