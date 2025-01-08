import axios from "axios";
import { LoginBasicInfo , SignUpBasicInfo } from "../Model/AuthInterfaceWater";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AuthService = {
  login: async (loginData: LoginBasicInfo): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/login`, loginData);
      return response.data; // Return the API response data
    } catch (error: any) {
      console.error("Error during login:", error.response?.data || error.message);
      throw new Error(
          error.response?.data?.message || "Login failed. Please try again."
      );
    }
  },
  Adminlogin: async (loginData: LoginBasicInfo): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/Adminlogin`, loginData);
      return response.data; // Return the API response data
    } catch (error: any) {
      console.error("Error during login:", error.response?.data || error.message);
      throw new Error(
          error.response?.data?.message || "Login failed. Please try again."
      );
    }
  },
  signup: async (SignUpData: SignUpBasicInfo): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/signup`,SignUpData);
      return response.data; // Return the API response data
    } catch (error: any) {
      console.error("Error during signup:", error.response?.data || error.message);
      throw new Error(
          error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  },
};
