import axios from "axios";
import { ReceiptDTO } from "../../../Model/WaterTransport/User/Receipt";
const API_URL = import.meta.env.VITE_APP_API_URL;

const BASE_URL = `${API_URL}/receipts`; // Replace with your backend URL

export const generateReceipt = async (bookingId: number): Promise<ReceiptDTO> => {
  try {
    const response = await axios.post(`${BASE_URL}/generate`, null, {
      params: { bookingId },
    });
    return response.data;
  } catch (error) {
    throw new Error(error + "Failed to generate receipt");
  }
};


export const getReceipt = async (receiptId: number): Promise<ReceiptDTO> => {
  try {
    console.log(receiptId)
    const response = await axios.get(`${BASE_URL}/${receiptId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get receipt: ${error}`);
  }
};
