import React from "react";
import { useNavigate } from "react-router-dom";

const AirCard: React.FC = () => {
  const planes = [
    {
      name: "vistara",
      image:
        "https://i.ndtvimg.com/i/2018-02/vistara_650x400_81519372774.jpg?downsize=773:435",
      description:
        "Experience the luxury of sailing with world-class amenities.",
      rating: 4.5,
      price: 5000,
    },
    {
      name: "Spice Jet",
      image:
        "https://static.india.com/wp-content/uploads/2024/01/SpiceJet-Airlines.jpg?impolicy=Medium_Widthonly&w=700",
      description:
        "A premium cruise with unforgettable views and top-notch services.",
      rating: 4.2,
      price: 4000,
    },
    {
      name: "Indigo",
      image:
        "https://www.traveltrendstoday.in/wp-content/uploads/2022/10/e1e1314be581632fc40af1dcb702ec73.jpg",
      description:
        "Perfect for families with kid-friendly activities and amenities.",
      rating: 4.8,
      price: 6000,
    },
  ];

  const navigate = useNavigate();

  const handleBookNow = (plane: (typeof planes)[0]) => {
    navigate("/AirDetails", { state: plane }); // Passing selected plane details to the new page
  };

  return (
    <div className="container mt-4 d-flex">
      <div className="cruise-cards-container" style={{ width: "75%" }}>
        <div className="card shadow-sm mt-4">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                Planes Available
              </span>
            </h3>
          </div>
          <div
            className="card-body"
            style={{
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              padding: "1rem", // Added padding inside the card body
              width: "100%", // Ensure it takes up the full width of the container
            }}
          >
            {planes.map((planes, index) => (
              <div key={index} className="card mb-4 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src={planes.image}
                      alt={planes.name}
                      className="img-fluid rounded-start"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{planes.name}</h5>
                      <p className="card-text">{planes.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Rating: {planes.rating}
                        </small>
                      </p>
                      <p className="card-text">
                        <strong>Price: ₹{planes.price}</strong>
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBookNow(planes)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirCard;
