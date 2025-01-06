import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeMain = () => {
  const navigate = useNavigate();

  // State for form fields and API response
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle search button click
  const handleSearch = async () => {
    setError(""); // Reset any previous errors
    setLoading(true); // Set loading state to true

    // Validate input fields
    if (!source || !destination) {
      setError("Source and Destination are required.");
      setLoading(false);
      return;
    }

    try {
      // API call to fetch ship details based on source and destination
      const response = await axios.get(
        "http://localhost:8085/shipdetails/search",
        {
          params: {
            source, // source from input field
            destination, // destination from input field
          },
        }
      );

      // Save the ship details in the state
      setShips(response.data);
      // Navigate to the Search page and pass ships data in the state
      navigate("/search", { state: { ships: response.data } });
    } catch (err) {
      // Set error state if the API call fails
      setError("Failed to fetch ships. Please try again later.");
    } finally {
      // Set loading state to false after API call is complete
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Search Ships</h3>
        </div>
        <div className="card-body">
          <div className="row align-items-end">
            {/* Source */}
            <div className="col-md-2">
              <label htmlFor="source" className="form-label">
                Source
              </label>
              <input
                type="text"
                id="source"
                className="form-control"
                placeholder="Enter Source"
                value={source}
                onChange={(e) => setSource(e.target.value)} // Bind source input to state
              />
            </div>

            {/* Destination */}
            <div className="col-md-2">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                className="form-control"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)} // Bind destination input to state
              />
            </div>


            {/* Date To */}
            <div className="col-md-2">
              <label htmlFor="dateTo" className="form-label">
                Date To
              </label>
              <input type="date" id="dateTo" className="form-control" />
            </div>

            {/* Date From */}
            <div className="col-md-2">
              <label htmlFor="dateFrom" className="form-label">
                Date From
              </label>
              <input type="date" id="dateFrom" className="form-control" />
            </div>


            {/* Number of Travelers */}
            <div className="col-md-2">
              <label htmlFor="numTravelers" className="form-label">
                Travelers
              </label>
              <input
                type="number"
                id="numTravelers"
                className="form-control"
                placeholder="Travelers"
              />
            </div>

            {/* Cruise Type */}
            <div className="col-md-2">
              <label htmlFor="cruiseType" className="form-label">
                Cruise Type
              </label>
              <select id="cruiseType" className="form-select">
                <option value="family">Family</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
                <option value="deluxe">Deluxe</option>
              </select>
            </div>


            {/* Search Button */}
            <div className="col-md-12 mt-3 d-flex justify-content-center">
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        
        {/* Error Message */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* Loading Spinner */}
        {loading && <p className="mt-3">Loading...</p>}

        {/* Display Ship Results */}
        {ships.length > 0 && (
          <div className="card mt-4">
            <div className="card-body">
              <h4>Ship Details</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Cruise Length</th>
                    <th>Date</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {ships.map((ship, index) => (
                    <tr key={index}>
                      <td>{ship.source}</td>{" "}
                      {/* Assuming 'source' is a field in your ship object */}
                      <td>{ship.destination}</td>{" "}
                      {/* Assuming 'destination' is a field in your ship object */}
                      <td>{ship.name}</td>{" "}
                      {/* Assuming 'name' is a field in your ship object */}
                      <td>{ship.price}</td>{" "}
                      {/* Assuming 'price' is a field in your ship object */}
                      <td>{ship.cruiseLength}</td>{" "}
                      {/* Assuming 'cruiseLength' is a field in your ship object */}
                      <td>{ship.date}</td>{" "}
                      {/* Assuming 'date' is a field in your ship object */}
                      <td>{ship.rating}</td>{" "}
                      {/* Assuming 'rating' is a field in your ship object */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Discount Section */}
      <div className="card mt-4">
        <h1>Discounts for You</h1>
        <div className="row">
          {/* First Card */}
          <div className="col-md-4 mb-4">
            <div
              className="bg-light-danger px-6 py-8 rounded-2 me-7"
              style={{ width: "200px" }}
            >
              <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
              <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                10% off
              </a>
            </div>
          </div>

          {/* Second Card */}
          <div className="col-md-4 mb-4">
            <div
              className="bg-light-danger px-6 py-8 rounded-2 me-7"
              style={{ width: "200px" }}
            >
              <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
              <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                20% off
              </a>
            </div>
          </div>

          {/* Third Card */}
          <div className="col-md-4 mb-4">
            <div
              className="bg-light-danger px-6 py-8 rounded-2 me-7"
              style={{ width: "200px" }}
            >
              <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
              <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                30% off
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const HomeMain = () => {
//   const navigate = useNavigate();

//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [ships, setShips] = useState([]); // Store ships data

//   // Handle search button click
//   const handleSearch = async () => {
//     setError(""); // Reset any previous errors
//     setLoading(true); // Set loading state to true

//     if (!source || !destination) {
//       setError("Source and Destination are required.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:8085/shipdetails/search", {
//         params: { source, destination },
//       });

//       setShips(response.data); // Save the ships data
//       // Navigate to the Search page and pass ships data in the state
//       navigate("/search", { state: { ships: response.data } });
//     } catch (err) {
//       setError("Failed to fetch ships. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card">
//         <div className="card-header">
//           <h3 className="card-title">Travel Booking Form</h3>
//         </div>
//         <div className="card-body">
//           <div className="row align-items-end">
//             <div className="col-md-6">
//               <label htmlFor="source" className="form-label">Source</label>
//               <input
//                 type="text"
//                 id="source"
//                 className="form-control"
//                 placeholder="Enter Source"
//                 value={source}
//                 onChange={(e) => setSource(e.target.value)}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="destination" className="form-label">Destination</label>
//               <input
//                 type="text"
//                 id="destination"
//                 className="form-control"
//                 placeholder="Enter Destination"
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//               />
//             </div>

//             <div className="col-md-12 mt-3 d-flex justify-content-center">
//               <button className="btn btn-primary" onClick={handleSearch}>
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>

//         {error && <div className="alert alert-danger mt-3">{error}</div>}
//         {loading && <p className="mt-3">Loading...</p>}
//       </div>
//     </div>
//   );
// };

// export default HomeMain;
