import axios from "axios";
import { ReceiptDTO } from "../../../Model/WaterTransport/User/Receipt";
const API_URL = import.meta.env.VITE_APP_API_URL;

const BASE_URL = `${API_URL}/receipts`; // Replace with your backend URL

export const generateReceipt = async (userId: number): Promise<ReceiptDTO> => {
  try {
    const response = await axios.post(`${BASE_URL}/generate`, null, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw new Error(error + "Failed to generate receipt");
  }
};
