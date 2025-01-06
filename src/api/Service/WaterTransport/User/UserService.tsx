import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export class UserService {
  public async getAllUsers() {
    try {
      const response = await axios.get(`${API_URL}/usermanagement`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Unable to fetch users");
    }
  }

  public async editUser(user: any) {
    try {
      const response = await axios.put(`${API_URL}/usermanagement`, user);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Unable to update user");
    }
  }
}
