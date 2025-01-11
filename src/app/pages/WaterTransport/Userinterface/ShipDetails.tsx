import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { createBooking } from "../../../../api/Service/WaterTransport/User/BookingService";
import { Booking } from "../../../../api/Model/WaterTransport/User/booking";
import BusBooking from "../../GroundTransport/UserUI_G/Homepage";

const ShipDetailsPage: React.FC = () => {
  const { shipId } = useParams<{ shipId: string }>();
  const [shipDetails, setShipDetails] = useState<{
    shipId: number;
    userid: number;
    name: string;
    cruiseType: string;
    cruiseLength: number;
    source: string;
    destination: string;
    image: string;
    description: string;
    rating: number;
    capacity: number;
    availability: string;
    price: number;
  } | null>(null);

  const [travelDate, setTravelDate] = useState<string>("");
  const [numTravelers, setNumTravelers] = useState<number>(1);

  const navigate = useNavigate();

  // Get userId from localStorage and safely parse it
  const userId = localStorage.getItem("userId");
  const parsedUserId = userId ? Number(userId) : null; // Safely parse userId

  useEffect(() => {
    const fetchShipDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/shipdetails/${shipId}`);
        setShipDetails(response.data);
        console.log(response.data.shipId);
      } catch (error) {
        console.error("Error fetching ship details:", error);
        alert("Failed to fetch ship details.");
      }
    };

    if (shipId) {
      fetchShipDetails();
    }
  }, [shipId]);

  const handleSaveBooking = async () => {
    if (!shipDetails || !parsedUserId) {
      alert("Please select a valid date and ensure you are logged in.");
      return;
    }

    // console.log(parsedUserId);
    // console.log(shipDetails.shipId);

    const bookingData: Booking = {
      seatsBooked: numTravelers,
      bookingStatus: "PENDING", 
      userid: parsedUserId, // Ensure valid userId
      shipId: shipDetails.shipId,
    };

    try {
      const createdbooking  = await createBooking(bookingData);
      console.log(createdbooking)
    

      navigate("/summary", { state: { bookingData, shipDetails,createdbooking } });
    } catch (error) {
      alert("Failed to create booking. Please try again.");
    }
  };

  if (!shipDetails) {
    return <div>Loading ship details...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="card-title">{shipDetails.name}</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={shipDetails.image}
                alt={shipDetails.name}
                className="img-fluid rounded-start"
                style={{ height: "300px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="card-title">{shipDetails.name}</h2>
              <p className="card-text">{shipDetails.description}</p>
              <p className="card-text">
                <strong>Price: ₹{shipDetails.price}</strong>
              </p>
              <p className="card-text">Capacity: {shipDetails.capacity}</p>
              <p className="card-text">Source: {shipDetails.source}</p>
              <p className="card-text">Destination: {shipDetails.destination}</p>
              <p className="card-text">Cruise Length: {shipDetails.cruiseLength}</p>
              <p className="card-text">Cruise Type: {shipDetails.cruiseType}</p>
              <p className="card-text">Availability: {shipDetails.availability}</p>
              <p className="card-text">
                <small className="text-muted">Rating: {shipDetails.rating}</small>
              </p>
              {/* Number of Travelers */}
              <div className="mb-3">
                <label className="form-label">Number of Travelers</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={numTravelers}
                  onChange={(e) => setNumTravelers(Number(e.target.value))}
                />
              </div>

              <button className="btn btn-primary float-end" onClick={handleSaveBooking}>
                Save Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipDetailsPage;
