import axios from "axios";
import { LoginBasicInfo, SignUpBasicInfo } from "../Model/AuthInterfaceWater";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AuthService = {
  // Login function
  login: async (loginData: LoginBasicInfo): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/login`, loginData);
      console.log("Full Response Data: ", response.data);

      // Check if login was successful
      if (response.data.status && response.data.message === 'Login Success') {
        const userId = response.data.userId; // Now userId is available in the response

        if (userId) {
          // Store userId in localStorage for later use
          localStorage.setItem("userId", userId);
        } else {
          console.error("User ID is missing in the response.");
        }
      }

      return response.data; // Return the API response data
    } catch (error: any) {
      console.error("Error during login:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
  },

  // Admin login function
  Adminlogin: async (loginData: LoginBasicInfo): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/Adminlogin`, loginData);
      console.log("Admin Data : " , response.data);
      return response.data; // Return the API response data
    } catch (error: any) {
      console.error("Error during admin login:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Admin login failed. Please try again."
      );
    }
  },

  // Signup function
  signup: async (SignUpData: SignUpBasicInfo): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/signup`, SignUpData);
      return response.data; // Return the API response data
    } catch (error: any) {
      console.error("Error during signup:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  },
};
