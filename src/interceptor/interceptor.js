import axios from "axios";
import { toast } from "react-toastify";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});



axiosInstance.interceptors.response.use(
  (response) => {
    const method = response?.config?.method?.toUpperCase(); // Get HTTP method
    if (
      method === "POST" ||
      method === "DELETE" ||
      method === "PUT" ||
      method === "PATCH"
    ) {
      toast.success(response?.data?.message, { autoClose: 1000 });
    }

    return response;
  },
  (error) => {
    if (error?.config?.url !== "/auth/myProfile") {
      toast.error(error?.response?.data?.message, { autoClose: 3000 });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
