import axios from "axios";
import { Booking } from "../../../Model/WaterTransport/User/booking";

const BASE_URL = "http://localhost:8085/bookings"; 

export const createBooking = async (bookingData: Booking) => {
  try {
    console.log("Booking created: ", bookingData);
    const response = await axios.post(`${BASE_URL}`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
