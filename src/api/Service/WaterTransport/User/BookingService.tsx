import axios from "axios";
import { Booking } from "../../../Model/WaterTransport/User/booking";

const BASE_URL = "http://localhost:8085/bookings";

export const createBooking = async (bookingData: Booking) => {
  try {
    console.log("Booking created: ", bookingData);
    const response = await axios.post(`${BASE_URL}`, bookingData);
    return response.data; // Return the booking data (including bookingId)
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const initiatePayment = async (bookingId: number, amount: number) => {
  try {
    console.log("Initiating payment with bookingId:", bookingId, "and amount:", amount);

    const paymentData = {
      bookingId, // Pass the bookingId
      amount, // Pass the amount
    };

    // Send the payment data as the body of the POST request (rather than query params)
    const response = await axios.post("http://localhost:8085/payments/initiate", paymentData);
    return response.data; // Return the response from the payment API
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw new Error("Error initiating payment");
  }
};
