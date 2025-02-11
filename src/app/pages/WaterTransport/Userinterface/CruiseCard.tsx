// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CruisePage: React.FC = () => {
//   const cruises = [
//     {
//       name: "Luxury Cruise",
//       image:
//         "https://s3.eu-west-1.amazonaws.com/mundy.assets.d3r.com/images/hero_large/93443-predicting-the-future-of-luxury-cruising-with-ai.png",
//       description:
//         "Experience the luxury of sailing with world-class amenities.",
//       rating: 4.5,
//       price: 5000,
//     },
//     {
//       name: "Premium Cruise",
//       image:
//         "https://luxury-tours.in/wp-content/uploads/2024/07/cruises-1.webp",
//       description:
//         "A premium cruise with unforgettable views and top-notch services.",
//       rating: 4.2,
//       price: 4000,
//     },
//     {
//       name: "Family Cruise",
//       image:
//         "https://s3.eu-west-1.amazonaws.com/mundy.assets.d3r.com/images/hero_large/93443-predicting-the-future-of-luxury-cruising-with-ai.png",
//       description:
//         "Perfect for families with kid-friendly activities and amenities.",
//       rating: 4.8,
//       price: 6000,
//     },
//   ];

//   const navigate = useNavigate();

//   const handleBookNow = (cruise: (typeof cruises)[0]) => {
//     navigate("/ship-details", { state: cruise }); // Passing cruise details to the new page
//   };

//   return (
//     <div className="container mt-4 d-flex">
//       <div className="cruise-cards-container" style={{ width: "75%" }}>
//         <div className="card shadow-sm mt-4">
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">
//                 Cruises Available
//               </span>
//             </h3>
//           </div>
//           <div
//             className="card-body"
//             style={{
//               boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
//               padding: "1rem", // Added padding inside the card body
//               width: "100%", // Ensure it takes up the full width of the container
//             }}
//           >
//             {cruises.map((cruise, index) => (
//               <div key={index} className="card mb-4 shadow-sm">
//                 <div className="row g-0">
//                   <div className="col-md-6">
//                     <img
//                       src={cruise.image}
//                       alt={cruise.name}
//                       className="img-fluid rounded-start"
//                       style={{ height: "200px", objectFit: "cover" }}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <div className="card-body">
//                       <h5 className="card-title">{cruise.name}</h5>
//                       <p className="card-text">{cruise.description}</p>
//                       <p className="card-text">
//                         <small className="text-muted">
//                           Rating: {cruise.rating}
//                         </small>
//                       </p>
//                       <p className="card-text">
//                         <strong>Price: ₹{cruise.price}</strong>
//                       </p>
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => handleBookNow(cruise)}
//                       >
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CruisePage;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Icon } from "leaflet"; // For customizing marker icons
import "leaflet/dist/leaflet.css";
import "../../../../../public/media/icons/placeholder.png"

import { geocodeLocation } from "./geocodeLocation"; // Import geocode function

// Define the structure of Ship data type
interface Ship {
  shipId: number;
  name: string;
  description: string;
  capacity: number;
  source: string;
  destination: string;
  cruiseLength: string;
  cruiseType: string;
  date: string;
  availability: string;
  rating: number;
  price: number;
  sourceLat?: number;
  sourceLon?: number;
  destLat?: number;
  destLon?: number;
}

const CruisePage: React.FC = () => {
  // Retrieve the ships data from location state
  const { state } = useLocation();
  const ships = state?.ships || []; // Ensure ships data exists
  const navigate = useNavigate();

  // State to hold coordinates for source and destination of each ship
  const [shipCoordinates, setShipCoordinates] = useState<{ [key: number]: { source: any, destination: any } }>({});

  const handleBookNow = (shipId: number) => {
    navigate(`/ship-details/${shipId}`);
  };

  // Fetch geocoordinates for each ship's source and destination when ships data is available
  useEffect(() => {
    const fetchCoordinates = async () => {
      for (const ship of ships) {
        const sourceCoords = await geocodeLocation(ship.source);
        const destCoords = await geocodeLocation(ship.destination);

        // Update the state with fetched coordinates
        setShipCoordinates((prev) => ({
          ...prev,
          [ship.shipId]: {
            source: sourceCoords,
            destination: destCoords,
          },
        }));
      }
    };
    if (ships.length > 0) fetchCoordinates();
  }, [ships]);

  return (
    <div className="container mt-4">
      <div className="cruise-cards-container">
        {ships.length > 0 ? (
          ships.map((ship) => (
            <div key={ship.shipId} className="card mb-4 shadow-sm" style={{border:"solid black 2px"}}>
              <div className="row g-0">
                <div className="col-md-6">
                  <img
                    src="https://images.unsplash.com/photo-1606255635975-92851ad290cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Ship image placeholder
                    alt={ship.name}
                    className="img-fluid rounded-start"
                    style={{ height: "500px", width: "500px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">{ship.name}</h5>
                    <p className="card-text">{ship.description}</p>
                    <p className="card-text">Capacity: {ship.capacity}</p>
                    <p className="card-text">Source: {ship.source}</p>
                    <p className="card-text">Destination: {ship.destination}</p>
                    <p className="card-text">CruiseLength: {ship.cruiseLength}</p>
                    <p className="card-text">CruiseType: {ship.cruiseType}</p>
                    <p className="card-text">Date: {ship.date}</p>
                    <p className="card-text">Availability: {ship.availability}</p>

                    <p className="card-text">
                      <small className="text-muted">Rating: {ship.rating}</small>
                    </p>
                    <p className="card-text">
                      <strong>Price: ₹{ship.price}</strong>
                    </p>
                    <button className="btn btn-primary" onClick={() => handleBookNow(ship.shipId)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              

              {/* OpenSeaMap to display source and destination points */}
              <div className="map-container mt-4" style={{ height: "100%", width: "100%", padding:"20px"}}>
                <MapContainer center={[0, 0]} zoom={2} style={{ height: "300px", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                    noWrap={true}
                  />
                  {/* Add markers if coordinates are available */}
                  {shipCoordinates[ship.shipId] && (
                    <>
                      {shipCoordinates[ship.shipId].source && (
                        <Marker
                          position={shipCoordinates[ship.shipId].source}
                          icon={new Icon({ iconUrl: "../../../../../public/media/icons/placeholder.png", iconSize: [25, 25] })}
                        >
                          <Popup>{ship.source}</Popup>
                        </Marker>
                      )}
                      {shipCoordinates[ship.shipId].destination && (
                        <Marker
                          position={shipCoordinates[ship.shipId].destination}
                          icon={new Icon({ iconUrl: "../../../../../public/media/icons/placeholder.png", iconSize: [25, 25] })}
                        >
                          <Popup>{ship.destination}</Popup>
                        </Marker>
                      )}
                      {/* Add red polyline connecting the source and destination */}
                      <Polyline
                        positions={[
                          shipCoordinates[ship.shipId].source,
                          shipCoordinates[ship.shipId].destination,
                        ]}
                        color="red"
                        weight={5}
                        opacity={1}
                      />
                    </>
                  )}
                </MapContainer>
              </div>
            </div>
          ))
        ) : (
          <p>No ships available for the selected route.</p>
        )}
      </div>
    </div>
  );
};

export default CruisePage;
