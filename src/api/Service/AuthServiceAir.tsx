import axios from "axios";
import { LoginBasicInfo } from "../Model/AuthInterfaceWater";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AirService = {
  login: async (loginData: LoginBasicInfo): Promise<LoginBasicInfo> => {
    try {
      const response = await axios.post<LoginBasicInfo>(
        `${API_URL}/auth/login`,
        loginData
      );
      return response.data;
    } catch (error) {
      console.error("Error during Air login:", error);
      throw error;
    }
  },
};
