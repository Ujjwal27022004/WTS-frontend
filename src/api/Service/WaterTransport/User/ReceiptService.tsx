import axios from "axios";
import { ReceiptDTO } from "../../../Model/WaterTransport/User/Receipt";

const BASE_URL = "http://localhost:8085/receipts"; // Replace with your backend URL

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
