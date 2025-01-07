import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaPhone, FaCreditCard, FaWallet } from "react-icons/fa";
import { PassengerService } from "../../../../api/Service/WaterTransport/User/PassengerService";
const SummaryPage: React.FC = () => {
  const location = useLocation();
  const bookingDetails = location.state as {
    cruise: {
      name: string;
      image: string;
      description: string;
      rating: number;
      price: number;
      gallery: string[];
    };
    travelDate: string;
    numTravelers: number;
    userInfo: {
      name: string;
      email: string;
      phone: string;
    };
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [passengers, setPassengers] = useState<any[]>([]);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [newPassenger, setNewPassenger] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const passengerService = new PassengerService();

  // Fetch passengers when the component mounts
  // useEffect(() => {
  //   const fetchPassengers = async () => {
  //     try {
  //       const data = await passengerService.getAllPassengerDetails();
  //       setPassengers(data); // Set the data in state
  //     } catch (error) {
  //       console.error("Error loading passengers:", error);
  //     }
  //   };

  //   fetchPassengers();
  // }, []); // Empty dependency array ensures it runs once on mount

  const handleAddPassenger = async () => {
    try {
      // Convert age to a number before making the API request
      const passengerData = {
        ...newPassenger,
        age: parseInt(newPassenger.age), // Convert the age string to a number
      };
  
      // Make a POST request to the backend to create a new passenger
      const response = await passengerService.createPassengerDetails(passengerData);
  
      // On success, update the passengers state and reset the form
      setPassengers((prevPassengers) => [...prevPassengers, passengerData]);
      setShowPassengerForm(false); // Hide the form after adding the passenger
      setNewPassenger({ name: "", age: "", gender: "" }); // Reset the form
  
      // Optionally, display a success message
      alert(response); // Assuming the response from your backend is the success message
    } catch (error) {
      console.error("Error adding passenger:", error);
      // Optionally, display an error message
      alert("Error adding passenger");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Booking Summary</h3>
      <div className="card">
        <div
          className="card-body"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {/* Image Section */}
          <div style={{ flex: "1 1 300px", marginRight: "20px" }}>
            <img
              src={bookingDetails.cruise.image}
              alt={bookingDetails.cruise.name}
              className="img-fluid"
              style={{ height: "300px", objectFit: "cover" }}
            />
          </div>

          {/* Text Details Section */}
          <div style={{ flex: "2 1 400px" }}>
            <h5>{bookingDetails.cruise.name}</h5>
            <p>{bookingDetails.cruise.description}</p>
            <p>
              <strong>Price:</strong> ₹{bookingDetails.cruise.price}
            </p>
            <p>
              <strong>Check-in Date:</strong> {bookingDetails.travelDate}
            </p>
            <p>
              <strong>Number of Travelers:</strong>{" "}
              {bookingDetails.numTravelers}
            </p>

            <h5>User Information</h5>
            <p>
              <strong>Name:</strong> {bookingDetails.userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {bookingDetails.userInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {bookingDetails.userInfo.phone}
            </p>

            {/* Passenger Details Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <h5 style={{ margin: 0 }}>Passenger Details</h5>
              <button
                className="btn btn-primary"
                onClick={() => setShowPassengerForm(true)}
              >
                Add Passenger
              </button>
            </div>

            {/* Render the Passenger Form when showPassengerForm is true */}
            {showPassengerForm && (
              <div>
                <h5>Add Passenger</h5>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={newPassenger.name}
                      onChange={(e) =>
                        setNewPassenger({
                          ...newPassenger,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      value={newPassenger.age}
                      onChange={(e) =>
                        setNewPassenger({
                          ...newPassenger,
                          age: e.target.value,
                        })
                      }
                      placeholder="Enter Age"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      className="form-control"
                      id="gender"
                      value={newPassenger.gender}
                      onChange={(e) =>
                        setNewPassenger({
                          ...newPassenger,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddPassenger}
                  >
                    Add Passenger
                  </button>
                </form>
              </div>
            )}

            {/* Render List of Passengers */}
            {passengers.length > 0 && (
              <div>
                <h5>Passengers Added</h5>
                <ul>
                  {passengers.map((passenger, index) => (
                    <li key={index}>
                      {passenger.name} - Age: {passenger.age} - Gender:{" "}
                      {passenger.gender}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details Section */}
        <div
          style={{ position: "relative", marginTop: "20px", padding: "10px" }}
        >
          <h5>Payment Details</h5>
          <p>
            <strong>Price:</strong> ₹
            {bookingDetails.cruise.price * bookingDetails.numTravelers}
          </p>

          {/* Payment options */}
          <div
            className="payment-options"
            style={{ display: "flex", gap: "15px" }}
          >
            <button
              className={`btn ${
                selectedPaymentMethod === "phonepe"
                  ? "btn-primary"
                  : "btn-light"
              }`}
              onClick={() => setSelectedPaymentMethod("phonepe")}
            >
              <FaWallet style={{ marginRight: "8px" }} /> PhonePe
            </button>
            <button
              className={`btn ${
                selectedPaymentMethod === "upi" ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setSelectedPaymentMethod("upi")}
            >
              UPI
            </button>
            <button
              className={`btn ${
                selectedPaymentMethod === "creditcard"
                  ? "btn-primary"
                  : "btn-light"
              }`}
              onClick={() => setSelectedPaymentMethod("creditcard")}
            >
              <FaCreditCard style={{ marginRight: "8px" }} /> Credit Card
            </button>
          </div>

          {/* Pay Now Button */}
          <button
            className="btn btn-primary"
            style={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
            }}
            disabled={!selectedPaymentMethod}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
