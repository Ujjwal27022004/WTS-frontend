// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaPhone, FaCreditCard, FaWallet } from "react-icons/fa";
// import { PassengerService } from "../../../../api/Service/WaterTransport/User/PassengerService";

// // Define the type for location.state
// interface LocationState {
//   bookingData: {
//     // travelDate: string;
//     seatsBooked: number;
//     bookingStatus:string,
//     userid: number;
//     shipId:number
//   };
//   shipDetails: {
//     availability:boolean,
//     capacity:number,
//     cruiseLength:number
//     cruiseType:number
//     date:string
//     destination:string
//     name:string
//     price:number
//     rating:number
//     shipId:number
//     source:string
//     id: string;
//     description: string;
//     image: string;
//   };
// }



// const SummaryPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Use the defined type for location.state
//   const { bookingData, shipDetails } = location.state as LocationState;
//   console.log(bookingData.userid);
//   console.log(shipDetails);

//   // Booking details object
//   const bookingDetails = {
//     cruise: shipDetails,
//     // travelDate: bookingData?.travelDate,
//     numTravelers: bookingData?.seatsBooked,
//     shipId: shipDetails?.shipId,
//     userid: bookingData?.userid,
//   };
//   console.log(bookingDetails)

//   if (!bookingDetails.cruise) {
//     return <p>Error: Booking details are missing or invalid.</p>;
//   }

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
//   const [passengers, setPassengers] = useState<any[]>([]);
//   const [showPassengerForm, setShowPassengerForm] = useState(false);
//   const [newPassenger, setNewPassenger] = useState({
//     name: "",
//     age: "",
//     gender: "",
//   });

//   const passengerService = new PassengerService();

//   // useEffect(() => {
//   //   const fetchPassengers = async () => {
//   //     try {
//   //       const data = await passengerService.getAllPassengerDetails();
//   //       setPassengers(data);
//   //     } catch (error) {
//   //       console.error("Error fetching passengers:", error);
//   //     }
//   //   };

//   //   fetchPassengers();
//   // }, []);

//   const handleAddPassenger = async () => {
//     try {
//       const passengerData = {
//         ...newPassenger,
//         age: parseInt(newPassenger.age, 10),
//       };

//       if (!passengerData.name || !passengerData.age || !passengerData.gender) {
//         alert("Please fill out all fields.");
//         return;
//       }

//       const response = await passengerService.createPassengerDetails(
//         passengerData
//       );
//       setPassengers((prev) => [...prev, passengerData]);
//       setShowPassengerForm(false);
//       setNewPassenger({ name: "", age: "", gender: "" });
//       alert(response);
//     } catch (error) {
//       console.error("Error adding passenger:", error);
//       alert("Error adding passenger.");
//     }
//   };

//   const handlePayment = () => {
//     if (!selectedPaymentMethod) {
//       alert("Please select a payment method.");
//       return;
//     }

//     const totalAmount =
//       bookingDetails.cruise.price * (bookingDetails.numTravelers || 1);

//     navigate("/receipt", {
//       state: {
//         cruise: bookingDetails.cruise,
//         // travelDate: bookingDetails.travelDate,
//         numTravelers: bookingDetails.numTravelers,
//         userInfo: bookingDetails.userid,
//         paymentMethod: selectedPaymentMethod,
//         passengers: passengers,
//         totalAmount,
        
//       },
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Booking Summary</h3>
//       <div className="card">
//         <div className="card-body" style={{ display: "flex", flexWrap: "wrap" }}>
//           <div style={{ flex: "1 1 300px", marginRight: "20px" }}>
//             <img
//               src={bookingDetails.cruise.image}
//               alt={bookingDetails.cruise.name}
//               className="img-fluid"
//               style={{ height: "300px", objectFit: "cover" }}
//             />
//           </div>
//           <div style={{ flex: "2 1 400px" }}>
//             <h5>{bookingDetails.cruise.name}</h5>
//             <p>CruiseType : {bookingDetails.cruise.cruiseType}</p>
//             <p>Source : {bookingDetails.cruise.source}</p>
//             <p>Destination : {bookingDetails.cruise.destination}</p>
//             <p>
//               <strong>Price:</strong> ₹{bookingDetails.cruise.price}
//             </p>
//             <p>
//               {/* <strong>Check-in Date:</strong> {bookingDetails.travelDate} */}
//             </p>
//             <p>
//               <strong>Number of Travelers:</strong>{" "}
//               {bookingDetails.numTravelers}
//             </p>
//           </div>
//         </div>
//         <div style={{ marginTop: "20px", padding: "10px" }}>
//           <h5>Payment Details</h5>
//           <p>
//             <strong>Total Price:</strong> ₹
//             {bookingDetails.cruise.price * (bookingDetails.numTravelers || 1)}
//           </p>


//           <div className="mt-4">
//             <h5>Passenger Details</h5>
//             <button
//               className="btn btn-primary"
//               onClick={() => setShowPassengerForm(true)}
//             >
//               Add Passenger
//             </button>

//             {showPassengerForm && (
//               <div className="mt-3">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="form-control mb-2"
//                   value={newPassenger.name}
//                   onChange={(e) =>
//                     setNewPassenger({ ...newPassenger, name: e.target.value })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Age"
//                   className="form-control mb-2"
//                   value={newPassenger.age}
//                   onChange={(e) =>
//                     setNewPassenger({ ...newPassenger, age: e.target.value })
//                   }
//                 />
//                 <select
//                   className="form-control mb-2"
//                   value={newPassenger.gender}
//                   onChange={(e) =>
//                     setNewPassenger({ ...newPassenger, gender: e.target.value })
//                   }
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 <button
//                   className="btn btn-success"
//                   onClick={handleAddPassenger}
//                 >
//                   Save Passenger
//                 </button>
//               </div>
//             )}
//             <ul className="list-group mt-3">
//               {passengers.map((p, index) => (
//                 <li key={index} className="list-group-item">
//                   {p.name} - {p.age} years - {p.gender}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="mt-3">
//             <h6>Select Payment Method:</h6>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="paymentMethod"
//                 id="creditCard"
//                 value="Credit Card"
//                 onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//               />
//               <label className="form-check-label" htmlFor="creditCard">
//                 <FaCreditCard /> Credit Card
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="paymentMethod"
//                 id="wallet"
//                 value="Wallet"
//                 onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//               />
//               <label className="form-check-label" htmlFor="wallet">
//                 <FaWallet /> Wallet
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="paymentMethod"
//                 id="upi"
//                 value="UPI"
//                 onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//               />
//               <label className="form-check-label" htmlFor="upi">
//                 <FaPhone /> UPI
//               </label>
//             </div>
//           </div>
//           <button onClick={handlePayment} className="btn btn-success mt-3">
//             Proceed to Pay
//           </button>
//         </div>
//       </div>


//     </div>
//   );
// };

// export default SummaryPage;







import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPhone, FaCreditCard, FaWallet } from "react-icons/fa";
import { PaymentService } from "../../../../api/Service/WaterTransport/User/PaymentService";
import { PassengerService } from "../../../../api/Service/WaterTransport/User/PassengerService";

interface LocationState {
  bookingData: {
    seatsBooked: number;
    bookingStatus: string;
    userid: number;
    shipId: number;
  };
  shipDetails: {
    availability: boolean;
    capacity: number;
    cruiseLength: number;
    cruiseType: number;
    date: string;
    destination: string;
    name: string;
    price: number;
    rating: number;
    shipId: number;
    source: string;
    id: string;
    description: string;
    image: string;
  };
  createdbooking:string
}

const SummaryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, shipDetails,createdbooking } = location.state as LocationState;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
    const [passengers, setPassengers] = useState<any[]>([]);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [newPassenger, setNewPassenger] = useState({
        name: "",
        age: "",
        gender: "",
      });
        const passengerService = new PassengerService();

  const [showConfirmationPopup, setShowConfirmationPopup] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<number | null>(null);
  
  const paymentService = new PaymentService();

  const bookingDetails = {
    cruise: shipDetails,
    numTravelers: bookingData?.seatsBooked,
    shipId: shipDetails?.shipId,
    userid: bookingData?.userid,
    bookingId : createdbooking
  };

  if (!bookingDetails.cruise) {
    return <p>Error: Booking details are missing or invalid.</p>;
  }


  const handleAddPassenger = async () => {
        try {
          const passengerData = {
            ...newPassenger,
            age: parseInt(newPassenger.age, 10),
          };
    
          if (!passengerData.name || !passengerData.age || !passengerData.gender) {
            alert("Please fill out all fields.");
            return;
          }
    
          const response = await passengerService.createPassengerDetails(
            passengerData
          );
          setPassengers((prev) => [...prev, passengerData]);
          setShowPassengerForm(false);
          setNewPassenger({ name: "", age: "", gender: "" });
          alert(response);
        } catch (error) {
          console.error("Error adding passenger:", error);
          alert("Error adding passenger.");
        }
      };
      const [paymentID, setPaymentID] = useState<string | null>(null); // Initialize state to hold paymentID


  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const totalAmount = bookingDetails.cruise.price * (bookingDetails.numTravelers || 1);

    try {
      // Call the initiate payment API
      const payment = await paymentService.initiatePayment( Number (bookingDetails.bookingId), totalAmount);
      const { paymentID: paymentIdFromResponse } = payment; // Extract paymentID from the response
      setPaymentID(paymentIdFromResponse); // Set paymentID to state

      console.log(paymentID)
      setShowConfirmationPopup(true); // Show the confirmation popup

    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment.");
    }
  };

  const handleConfirmPayment = async () => {
    if (paymentID === null) {
      alert("Payment ID is missing.");
      return;
    }
    console.log(paymentID)

    try {
      // Call the confirm payment API
      const response = await paymentService.confirmPayment(Number(paymentID));
      alert(response); // Show success message
      navigate("/receipt", {
        state: {
          cruise: bookingDetails.cruise,
          numTravelers: bookingDetails.numTravelers,
          userInfo: bookingDetails.userid,
          paymentMethod: selectedPaymentMethod,
          totalAmount: bookingDetails.cruise.price * (bookingDetails.numTravelers || 1),
        },
      });
    } catch (error) {
      console.error("Payment confirmation failed:", error);
      alert("Failed to confirm payment.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Booking Summary</h3>
          
      <div className="card">
        <div className="card-body" style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px", marginRight: "20px" }}>
             <img
              src={bookingDetails.cruise.image}
              alt={bookingDetails.cruise.name}
              className="img-fluid"
              style={{ height: "300px", objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: "2 1 400px" }}>
            <h5>{bookingDetails.cruise.name}</h5>
            <p>CruiseType : {bookingDetails.cruise.cruiseType}</p>
            <p>Source : {bookingDetails.cruise.source}</p>
            <p>Destination : {bookingDetails.cruise.destination}</p>
            <p>
              <strong>Price:</strong> ₹{bookingDetails.cruise.price}
            </p>
            <p>
              {/* <strong>Check-in Date:</strong> {bookingDetails.travelDate} */}
            </p>
            <p>
              <strong>Number of Travelers:</strong>{" "}
              {bookingDetails.numTravelers}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "20px", padding: "10px" }}>
          <h5>Payment Details</h5>
          <p>
            <strong>Total Price:</strong> ₹
            {bookingDetails.cruise.price * (bookingDetails.numTravelers || 1)}
          </p>

          <div className="mt-4">
          <div className="mt-4">
            <h5>Passenger Details</h5>
            <button
              className="btn btn-primary"
              onClick={() => setShowPassengerForm(true)}
            >
              Add Passenger
            </button>

            {showPassengerForm && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control mb-2"
                  value={newPassenger.name}
                  onChange={(e) =>
                    setNewPassenger({ ...newPassenger, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Age"
                  className="form-control mb-2"
                  value={newPassenger.age}
                  onChange={(e) =>
                    setNewPassenger({ ...newPassenger, age: e.target.value })
                  }
                />
                <select
                  className="form-control mb-2"
                  value={newPassenger.gender}
                  onChange={(e) =>
                    setNewPassenger({ ...newPassenger, gender: e.target.value })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <button
                  className="btn btn-success"
                  onClick={handleAddPassenger}
                >
                  Save Passenger
                </button>
              </div>
            )}
            <ul className="list-group mt-3">
              {passengers.map((p, index) => (
                <li key={index} className="list-group-item">
                  {p.name} - {p.age} years - {p.gender}
                </li>
              ))}
            </ul>
          </div>
          </div>

          <div className="mt-3">
            <h6>Select Payment Method:</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="creditCard"
                value="Credit Card"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="creditCard">
                <FaCreditCard /> Credit Card
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="wallet"
                value="Wallet"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="wallet">
                <FaWallet /> Wallet
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="upi"
                value="UPI"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="upi">
                <FaPhone /> UPI
              </label>
            </div>
          </div>
          <button onClick={handlePayment} className="btn btn-success mt-3">
            Proceed to Pay
          </button>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showConfirmationPopup && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Payment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmationPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to confirm the payment?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmationPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmPayment}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryPage;

