// geocodeLocation.ts
import axios from "axios";

const API_KEY = "0d56c5062212456b8a51e29ad60a07c0"; // Replace with your OpenCage API key

interface Coordinates {
  lat: number;
  lon: number;
}

export const geocodeLocation = async (location: string): Promise<Coordinates | null> => {
  try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
      params: {
        q: location,
        key: API_KEY,
        no_annotations: 1, // Skip unnecessary annotations
      },
    });
    const results = response.data.results[0];
    if (results) {
      return { lat: results.geometry.lat, lon: results.geometry.lng };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data", error);
    return null;
  }
};
