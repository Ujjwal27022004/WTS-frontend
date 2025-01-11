import axios from "axios";

const BASE_URL = "http://localhost:8085/revenue"; // Backend URL

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

