import { User } from "../../../Model/WaterTransport/User/user";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export class UserService {
  // Fetch all users
  public async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}/usermanagement`);
      return response.data; // Assuming the API returns an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Unable to fetch users");
    }
  }

  // Add other user-related service methods as needed
}
