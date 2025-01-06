import axios from 'axios';

// Base API URL from environment variables
const API_URL = import.meta.env.VITE_APP_API_URL;

const AdminService = {
  /**
   * Fetch details of a specific admin by ID
   * @param {string} adminId - The ID of the admin to fetch
   * @returns {Promise<Object>} Admin details
   */
  getAdminDetails: async (adminId) => {
    try {
      const response = await axios.get(`${API_URL}/api/admindetails/${adminId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error fetching admin details';
    }
  },

  /**
   * Fetch all admin details
   * @returns {Promise<Array>} List of all admins
   */
  getAllAdminDetails: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admindetails`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error fetching admin list';
    }
  },

  /**
   * Update admin details
   * @param {Object} adminDTO - The admin data to update
   * @returns {Promise<Object>} Updated admin details
   */
  updateAdminDetails: async (adminDTO) => {
    try {
      const response = await axios.put(`${API_URL}/api/admindetails`, adminDTO);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error updating admin details';
    }
  },

  /**
   * Add a new ship
   * @param {Object} shipDetail - The details of the ship to add
   * @returns {Promise<Object>} Added ship details
   */
  addShipDetails: async (shipDetail) => {
    try {
      const response = await axios.post(`http://192.168.1.25:8085/api/admindetails/Shipadd`, shipDetail);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error adding ship details';
    }
  },

  /**
   * Edit an existing ship's details
   * @param {Object} shipDetail - The updated ship details
   * @returns {Promise<Object>} Updated ship details
   */
  editShipDetails: async (shipDetail) => {
    try {
      const response = await axios.put(`${API_URL}/api/admindetails/Shipedit`, shipDetail);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error editing ship details';
    }
  },

  /**
   * Delete a ship by its ID
   * @param {string} shipId - The ID of the ship to delete
   * @returns {Promise<Object>} Deletion confirmation
   */
  deleteShipDetails: async (shipId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/admindetails/delete/${shipId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error deleting ship';
    }
  },
};

export default AdminService;
