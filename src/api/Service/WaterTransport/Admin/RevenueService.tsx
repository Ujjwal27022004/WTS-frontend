import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const BASE_URL = `${API_URL}/revenue`; // Backend URL

export const RevenueService = {
    getRevenueByShipId: async (shipId: number): Promise<number> => {
        try {
            const response = await axios.get(`${BASE_URL}/${shipId}`);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching revenue:", error);
            throw error; // Propagate the error for handling in the component
        }
    },
};

