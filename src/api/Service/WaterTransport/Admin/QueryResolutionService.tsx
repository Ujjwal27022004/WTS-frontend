import axios from "axios";

const API_BASE_URL = "http://localhost:8085/query-resolution";
 // Base URL from your controller

// Fetch all queries
export const fetchAllQueries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getquery`);
    return response.data; // Assuming response contains the list of QueryDTO objects
  } catch (error) {
    console.error("Error fetching queries:", error);
    throw error; // Re-throw error to handle it in the component
  }
};

// Resolve a query
export const resolveQuery = async (queryId, resolutionDetails, status) => {
  try {
    const payload = {
      resolutionDetails,
      status,
    };
    const response = await axios.put(`${API_BASE_URL}/resolve/${queryId}`, payload);
    return response.data; // Assuming the response contains a LoginMessage object
  } catch (error) {
    console.error("Error resolving query:", error);
    throw error;
  }
};
