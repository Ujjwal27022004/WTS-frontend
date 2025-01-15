import axios from 'axios';
import { Passenger } from '../../../Model/WaterTransport/User/Passenger'; // Adjust the path as needed
const API_URL = import.meta.env.VITE_APP_API_URL;

const API_BASE_URL = `${API_URL}/passengerDetails`;

export class PassengerService {
    
    async fetchPassengerDetails(passengerId: number): Promise<Passenger> {
        const response = await axios.get(`${API_BASE_URL}/${passengerId}`);
        return response.data;
    }

    async createPassengerDetails(passenger: Passenger): Promise<string> {
        const response = await axios.post(API_BASE_URL, passenger);
        return response.data;
    }

    async updatePassengerDetails(passenger: Passenger): Promise<string> {
        const response = await axios.put(API_BASE_URL, passenger);
        return response.data;
    }

    async deletePassengerDetails(passengerId: number): Promise<string> {
        const response = await axios.delete(`${API_BASE_URL}/${passengerId}`);
        return response.data;
    }

    async getAllPassengerDetails(): Promise<Passenger[]> {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    }
}
