import axios from "axios";
import { ShipDetails } from "../../../Model/WaterTransport/Admin/ShipInterface";

// Base API URL from environment variables
const API_URL = import.meta.env.VITE_APP_API_URL;

const AdminService = {
  /**
   * Fetch details of all admins
   * @returns {Promise<Object[]>} List of all admin details
   */
  getAllAdminDetails: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admindetails`);
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Error fetching admin list";
      }
      throw "An unexpected error occurred";
    }
  },

  /**
   * Update admin details
   * @param {Object} adminDTO - The admin data to update
   * @returns {Promise<Object>} Updated admin details
   */
  updateAdminDetails: async (adminData: {
    adminId: number;
    password: string;
  }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admindetails/adminedit`,
        adminData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Error updating admin details";
      }
      throw "An unexpected error occurred";
    }
  },

  /**
   * Add a new ship
   * @param {Object} shipDetail - The details of the ship to add
   * @returns {Promise<Object>} Added ship details
   */
  addShipDetails: async (shipDetail:ShipDetails) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admindetails/Shipadd`,
        shipDetail
      );
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Error adding ship details";
      }
      throw "An unexpected error occurred";
    }
  },

  /**
   * Edit an existing ship's details
   * @param {Object} shipDetail - The updated ship details
   * @returns {Promise<Object>} Updated ship details
   */
  editShipDetails: async (shipDetail:ShipDetails) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admindetails/Shipedit`,
        shipDetail
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Error editing ship details";
      }
      throw "An unexpected error occurred";
    }
  },

  /**
   * Delete a ship by its ID
   * @param {string} shipId - The ID of the ship to delete
   * @returns {Promise<Object>} Deletion confirmation
   */
  deleteShipDetails: async (shipId:number) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admindetails/delete/${shipId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "Error deleting ship";
      }
      throw "An unexpected error occurred";
    }
  },
};

export default AdminService;
