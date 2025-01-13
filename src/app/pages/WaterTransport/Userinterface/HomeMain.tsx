import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const HomeMain = () => {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState({ username: "", email: "" });
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [query, setQuery] = useState("");
  const [showQueryPopup, setShowQueryPopup] = useState(false);
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
  const [showEditPasswordPopup,  setShowEditPasswordPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [showGetQueryPopup, setShowGetQueryPopup] = useState(false);
  const [userQueries, setUserQueries] = useState([]);


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
          .get(`${API_URL}/api/v1/user/details`, { params: { userid: userId } })
          .then(response => setUser(response.data))
          .catch(() => alert("Failed to retrieve user. Please try again later."));
    } else {
      alert("User ID is not available in local storage.");
    }
  }, []);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchUserQueries = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/user/getQueries`, {
          params: { userid: userId },
        });
        setUserQueries(response.data);
        console.log("okay");
        // Save fetched data to state
        setError(null); // Clear any previous error
      } catch (err) {
        setError(err.response?.data || "Error fetching queries");
      }
    };

    if (userId) {
      fetchUserQueries(); // Fetch queries if userId is provided
    }
  }, [showQueryPopup,showGetQueryPopup,userId]);

  const handleQuerySubmit = () => {
    if (!query) return;

    const userId = localStorage.getItem("userId");
    if (userId) {
      const queryDTO = { queryDetails: query };

      axios
          .post(`${API_URL}/api/v1/user/ask?userid=${userId}`, queryDTO)
          .then(() => {
            alert("Query submitted successfully.");
            setQuery("");
            setShowQueryPopup(false);
          })
          .catch(() => alert("Failed to submit query. Please try again later."));
    } else {
      alert("User ID is not available in local storage.");
    }
  };

  const handleProfileUpdate = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
          .put(`${API_URL}/api/v1/user/profile?userid=${userId}`, user)
          .then(() => {
            alert("Profile updated successfully.");
            setUser(user);
            setShowEditProfilePopup(false);
          })
          .catch(() => alert("Failed to update profile. Please try again later."));
    } else {
      alert("User ID is not available in local storage.");
    }
  };

  const handlePasswordUpdate = () => {
    const userId = localStorage.getItem("userId");
    const passwordDTO = { password: Password };
    if (userId) {
      if(Password != ConfirmPassword){
        alert("Check Password.");
      }else{
        axios
            .put(`${API_URL}/api/v1/user/profile?userid=${userId}`, passwordDTO)
            .then(() => {
              alert("Password updated successfully.");
              setPassword("");
              setConfirmPassword("");
              setShowEditPasswordPopup(false);
            })
            .catch(() => alert("Failed to update password. Please try again later."));
      }
    } else {
      alert("User ID is not available in local storage.");
    }
  };

  const handleSearch = async () => {
    setError("");
    setLoading(true);

    if (!source || !destination) {
      setError("Source and Destination are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8085/shipdetails/search", {
        params: { source, destination },
      });
      setShips(response.data);
      navigate("/search", { state: { ships: response.data } });
    } catch (err) {
      setError("Failed to fetch ships. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          className={`d-flex ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
          style={{ minHeight: "100vh", transition: "background-color 0.3s ease" }}
      >
        {/* Dashboard */}
        <div
            className="dashboard bg-gradient shadow-lg p-3"
            style={{
              width: "250px",
              borderRadius: "10px",
              transition: "all 0.3s ease",
            }}
        >
          <div className="text-center mb-4">
            <img
                src="/media/avatars/300-1.jpg"
                alt="Profile"
                className="rounded-circle mb-2"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "3px solid #fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
            />
            <h5 className="text-center mb-2" style={{fontSize: "1.2rem", fontWeight: "bold", color: "#2196F3"}}>
              {user.username}
            </h5>
            <p className="text-center" style={{fontSize: "1rem", color: "#9E9E9E"}}>
              {user.email}
            </p>
          </div>
          <button
              className="btn btn-outline-light w-100 mb-3 shadow-sm"
              onClick={() => setShowQueryPopup(true)}
          >
            Ask Query
          </button>
          <button
              className="btn btn-outline-light w-100 mb-3 shadow-sm"
              onClick={() => setShowEditProfilePopup(true)}
          >
            Edit Profile
          </button>

          <button
              className="btn btn-outline-light w-100 mb-3 shadow-sm"
              onClick={() => setShowEditPasswordPopup(true)}
          >
            Reset Password
          </button>

          <button
              className="btn btn-outline-light w-100 mb-3 shadow-sm"
              onClick={() => setShowGetQueryPopup(true)}
          >
            My Queries
          </button>


          {/* Query Popup */}
          {showQueryPopup && (
              <div
                  className="popup-overlay"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
              >
                <div
                    className="popup bg-white p-4 shadow rounded"
                    style={{width: "400px", borderRadius: "15px"}}
                >
                  <h5 className="text-center text-primary">Ask Query</h5>
                  <textarea
                      className="form-control mb-3"
                      rows="4"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter your query here..."
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                      }}
                  ></textarea>
                  <div className="text-center">
                    <button className="btn btn-primary" onClick={handleQuerySubmit}>
                      Submit
                    </button>
                    <button
                        className="btn btn-secondary ms-2"
                        onClick={() => setShowQueryPopup(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Edit Profile Popup */}
          {showEditProfilePopup && (
              <div
                  className="popup-overlay"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
              >
                <div
                    className="popup bg-white p-4 shadow rounded"
                    style={{width: "400px", borderRadius: "15px"}}
                >
                  <h5 className="text-center text-primary">Edit Profile</h5>
                  <input
                      type="text"
                      className="form-control mb-3"
                      value={user.username}
                      onChange={(e) => setUser({...user, username: e.target.value})}
                      placeholder="Username"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        transition: "all 0.3s ease",
                      }}
                  />
                  <input
                      type="email"
                      className="form-control mb-3"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      placeholder="Email"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        transition: "all 0.3s ease",
                      }}
                  />
                  <div className="text-center">
                    <button className="btn btn-primary" onClick={handleProfileUpdate}>
                      Save
                    </button>
                    <button
                        className="btn btn-secondary ms-2"
                        onClick={() => setShowEditProfilePopup(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
          )}

          {showEditPasswordPopup && (
              <div
                  className="popup-overlay"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
              >
                <div
                    className="popup bg-white p-4 shadow rounded"
                    style={{width: "400px", borderRadius: "15px"}}
                >
                  <h5 className="text-center text-primary">Reset Password</h5>
                  <input
                      type="text"
                      className="form-control mb-3"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        transition: "all 0.3s ease",
                      }}
                  />
                  <input
                      type="email"
                      className="form-control mb-3"
                      value={ConfirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        transition: "all 0.3s ease",
                      }}
                  />
                  <div className="text-center">
                    <button className="btn btn-primary" onClick={handlePasswordUpdate}>
                      Save
                    </button>
                    <button
                        className="btn btn-secondary ms-2"
                        onClick={() => setShowEditPasswordPopup(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
          )}


          {showGetQueryPopup && (
              <div
                  className="popup-overlay"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
              >
                <div
                    className="popup bg-white p-4 shadow rounded"
                    style={{
                      width: "700px",
                      borderRadius: "15px",
                      maxHeight: "90vh",
                      overflowY: "auto",
                    }}
                >
                  <h4 className="text-center text-primary mb-4">User Queries</h4>
                  {userQueries.length > 0 ? (
                      <div>
                        <table className="table table-bordered">
                          <thead className="thead-light">
                          <tr>
                            <th>#</th>
                            <th>Query Details</th>
                            <th>Resolution</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Resolved Date</th>
                          </tr>
                          </thead>
                          <tbody>
                          {userQueries.map((query, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{query.queryDetails}</td>
                                <td>
                                  {query.queryResolution
                                      ? query.queryResolution
                                      : "Resolution not available"}
                                </td>
                                <td>
                    <span
                        className={`badge ${
                            query.status === "Resolved"
                                ? "bg-success"
                                : query.status === "Pending"
                                    ? "bg-warning text-dark"
                                    : "bg-secondary"
                        }`}
                    >
                      {query.status}
                    </span>
                                </td>
                                <td>{new Date(query.createdDate).toLocaleString()}</td>
                                <td>
                                  {query.resolvedDate
                                      ? new Date(query.resolvedDate).toLocaleString()
                                      : "Not Resolved"}
                                </td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                  ) : (
                      <p className="text-center text-muted">No queries found for this user.</p>
                  )}
                  <div className="text-center mt-3">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowGetQueryPopup(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
          )}



        </div>

        {/* Main Content */}
        <div className="container mt-4 flex-grow-1">
          <div
              className={`navbar shadow-sm mb-4 d-flex justify-content-between align-items-center px-3 ${
                  darkMode ? "bg-secondary text-white" : "bg-light text-dark"
              }`}
          >
            <div>
              <h4>Water Transportation System</h4>
            </div>
            <div>
              <button
                  className={`btn ${darkMode ? "btn-light" : "btn-secondary"} me-2}
                  onClick={() => setDarkMode(!darkMode)`}
              >
                Dark Mode
              </button>
              <button
                  className="btn btn-danger"
                  onClick={() => navigate("/auth/login")}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="card shadow-lg rounded-3 mb-4">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title">Search Ships</h3>
            </div>
            <div className="card-body">
              <div className="row align-items-end">
                <div className="col-md-3">
                  <label htmlFor="source" className="form-label">
                    Source
                  </label>
                  <input
                      type="text"
                      id="source"
                      className="form-control"
                      placeholder="Enter Source"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="destination" className="form-label">
                    Destination
                  </label>
                  <input
                      type="text"
                      id="destination"
                      className="form-control"
                      placeholder="Enter Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="dateTo" className="form-label">
                    Date To
                  </label>
                  <input type="date" id="dateTo" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label htmlFor="dateFrom" className="form-label">
                    Date From
                  </label>
                  <input type="date" id="dateFrom" className="form-control" />
                </div>
                <div className="col-md-3">
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
                <div className="col-md-3">
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
                <div className="col-md-12 mt-3 d-flex justify-content-center">
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>

              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {loading && <p className="mt-3">Loading...</p>}

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
                              <td>{ship.source}</td>
                              <td>{ship.destination}</td>
                              <td>{ship.name}</td>
                              <td>{ship.price}</td>
                              <td>{ship.cruiseLength}</td>
                              <td>{ship.date}</td>
                              <td>{ship.rating}</td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}
            </div>
          </div>

          {/* Discount Section */}
          <div className="card mt-4">
            <h4 className="card-header text-white bg-secondary">Discounts for You</h4>
            <div className="row card-body">
              <div className="col-md-4 mb-4">
                <div className="bg-light px-4 py-6 text-center rounded shadow-lg">
                  <h5>10% Off</h5>
                  <p>On all family cruises</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="bg-light px-4 py-6 text-center rounded shadow-lg">
                  <h5>20% Off</h5>
                  <p>Premium bookings</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="bg-light px-4 py-6 text-center rounded shadow-lg">
                  <h5>30% Off</h5>
                  <p>Luxury packages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomeMain;