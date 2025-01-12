// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { createBooking } from "../../../../api/Service/WaterTransport/User/BookingService";
// import { Booking } from "../../../../api/Model/WaterTransport/User/booking";
// import BusBooking from "../../GroundTransport/UserUI_G/Homepage";
// import ship from "../../../../../public/media/WaterTransportSystem/ship.jpg"

// const ShipDetailsPage: React.FC = () => {
//   const { shipId } = useParams<{ shipId: string }>();
//   const [shipDetails, setShipDetails] = useState<{
//     shipId: number;
//     userid: number;
//     name: string;
//     cruiseType: string;
//     cruiseLength: number;
//     source: string;
//     destination: string;
//     image: string;
//     description: string;
//     rating: number;
//     capacity: number;
//     availability: string;
//     price: number;
//   } | null>(null);

//   const [travelDate, setTravelDate] = useState<string>("");
//   const [numTravelers, setNumTravelers] = useState<number>(1);

//   const navigate = useNavigate();

//   // Get userId from localStorage and safely parse it
//   const userId = localStorage.getItem("userId");
//   const parsedUserId = userId ? Number(userId) : null; // Safely parse userId

//   useEffect(() => {
//     const fetchShipDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8085/shipdetails/${shipId}`);
//         setShipDetails(response.data);
//         console.log(response.data.shipId);
//       } catch (error) {
//         console.error("Error fetching ship details:", error);
//         alert("Failed to fetch ship details.");
//       }
//     };

//     if (shipId) {
//       fetchShipDetails();
//     }
//   }, [shipId]);

//   const handleSaveBooking = async () => {
//     if (!shipDetails || !parsedUserId) {
//       alert("Please select a valid date and ensure you are logged in.");
//       return;
//     }

//     // console.log(parsedUserId);
//     // console.log(shipDetails.shipId);

//     const bookingData: Booking = {
//       seatsBooked: numTravelers,
//       bookingStatus: "PENDING", 
//       userid: parsedUserId, // Ensure valid userId
//       shipId: shipDetails.shipId,
//     };

//     try {
//       const createdbooking  = await createBooking(bookingData);
//       console.log(createdbooking)
    

//       navigate("/summary", { state: { bookingData, shipDetails,createdbooking } });
//     } catch (error) {
//       alert("Failed to create booking. Please try again.");
//     }
//   };

//   if (!shipDetails) {
//     return <div>Loading ship details...</div>;
//   }

//   return (
    
//     <div className="container mt-4">
//       <div className="card shadow-sm">
//         <div className="card-header">
//           <h3 className="card-title">{shipDetails.name}</h3>
//         </div>
//         <div className="card-body">
//           <div className="row">
//             <div className="col-md-6">
//               <img
//                 src="https://images.unsplash.com/photo-1580698360366-a34bd05adce4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNydWlzZSUyMHNoaXB8ZW58MHx8MHx8fDA%3D"
//                 alt={shipDetails?.name || "Ship Image"}
//                 className="img-fluid rounded-start"
//                 style={{ height: "300px", objectFit: "cover" }}
//               />
//             </div>
//             <div className="col-md-6">
//               <h2 className="card-title">{shipDetails.name}</h2>
//               <p className="card-text">{shipDetails.description}</p>
//               <p className="card-text">
//                 <strong>Price: ₹{shipDetails.price}</strong>
//               </p>
//               <p className="card-text">Capacity: {shipDetails.capacity}</p>
//               <p className="card-text">Source: {shipDetails.source}</p>
//               <p className="card-text">Destination: {shipDetails.destination}</p>
//               <p className="card-text">Cruise Length: {shipDetails.cruiseLength}</p>
//               <p className="card-text">Cruise Type: {shipDetails.cruiseType}</p>
//               <p className="card-text">Availability: {shipDetails.availability}</p>
//               <p className="card-text">
//                 <small className="text-muted">Rating: {shipDetails.rating}</small>
//               </p>
//               {/* Number of Travelers */}
//               <div className="mb-3">
//                 <label className="form-label">Number of Travelers</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   min="1"
//                   value={numTravelers}
//                   onChange={(e) => setNumTravelers(Number(e.target.value))}
//                 />
//               </div>

//               <button className="btn btn-primary float-end" onClick={handleSaveBooking}>
//                 Save Booking
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShipDetailsPage;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { createBooking } from "../../../../api/Service/WaterTransport/User/BookingService";
import { getRemainingSeats } from "../../../../api/Service/WaterTransport/User/availabilityService"; // Import service
import { Booking } from "../../../../api/Model/WaterTransport/User/booking";

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
  const [remainingSeats, setRemainingSeats] = useState<number | null>(null); // State for remaining seats

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const parsedUserId = userId ? Number(userId) : null;

  useEffect(() => {
    const fetchShipDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/shipdetails/${shipId}`);
        setShipDetails(response.data);
      } catch (error) {
        console.error("Error fetching ship details:", error);
        alert("Failed to fetch ship details.");
      }
    };

    if (shipId) {
      fetchShipDetails();
    }
  }, [shipId]);

  const handleCheckAvailability = async () => {
    if (!shipId) return;

    try {
      const seats = await getRemainingSeats(Number(shipId));
      setRemainingSeats(seats); // Update state with remaining seats
    } catch (error) {
      alert("Unable to fetch remaining seats. Please try again.");
    }
  };

  const handleSaveBooking = async () => {
    if (!shipDetails || !parsedUserId) {
      alert("Please select a valid date and ensure you are logged in.");
      return;
    }

    const bookingData: Booking = {
      seatsBooked: numTravelers,
      bookingStatus: "PENDING",
      userid: parsedUserId,
      shipId: shipDetails.shipId,
    };

    try {
      const createdbooking = await createBooking(bookingData);
      navigate("/summary", { state: { bookingData, shipDetails, createdbooking } });
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
                src="https://images.unsplash.com/photo-1606255635975-92851ad290cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={shipDetails?.name || "Ship Image"}
                className="img-fluid rounded-start"
                style={{ height: "550px",width:"500px",margin:"0",padding:"0", objectFit: "cover" }}
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
              <button className="btn btn-info me-2" onClick={handleCheckAvailability}>
                Check Availability
              </button><br></br>
              {remainingSeats !== null && (
                <h3>Remaining Seats: <strong>{remainingSeats}</strong></h3>
              )}
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

