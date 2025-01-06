import { ShipDetails } from "../../../Model/WaterTransport/Admin/ShipInterface";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export class ShipService {
  getShips() {
    throw new Error("Method not implemented.");
  }
  toggleAvailability(id: number) {
    throw new Error("Method not implemented.");
  }
  // Fetch all ships
  public async getAllShips(): Promise<ShipDetails[]> {
    try {
      const response = await axios.get(`${API_URL}/shipdetails`);
      return response.data; // Assuming the API returns an array of ships
    } catch (error) {
      console.error("Error fetching ships:", error);
      throw new Error("Unable to fetch ships");
    }
  }
}
