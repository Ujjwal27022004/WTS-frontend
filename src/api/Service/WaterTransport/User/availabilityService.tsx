import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const API_BASE_URL = `${API_URL}`;

export const getRemainingSeats = async (shipId: number): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shipdetails/remaining-seats/${shipId}`);
    const data = response.data;
    const remainingSeats = parseInt(data.replace("Remaining seats: ", ""), 10);
    return remainingSeats;
  } catch (error) {
    console.error("Error fetching remaining seats:", error);
    throw new Error("Unable to fetch remaining seats");
  }
};
