import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

// Define the PaymentService class
export class PaymentService {
  // API endpoint to initiate the payment
  async initiatePayment(bookingId: number, amount: number) {
    return axios
      .post(`${API_URL}/payments/initiate`, null, {
        params: { bookingId, amount },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error initiating payment:", error);
        throw new Error("Error initiating payment");
      });
  }

  // API endpoint to confirm the payment
  async confirmPayment(paymentId: number) {
    return axios
      .post(`${API_URL}/payments/confirm`, null, {
        params: { paymentId },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error confirming payment:", error);
        throw new Error("Error confirming payment");
      });
  }
}
