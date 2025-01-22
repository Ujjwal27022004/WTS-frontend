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
import { generateReceipt } from "../../../../api/Service/WaterTransport/User/ReceiptService";
import { Colors } from "chart.js";
const API_URL = import.meta.env.VITE_APP_API_URL;
import axios from "axios";


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
        const receiptData = {
          amount: bookingDetails.cruise.price * (bookingDetails.numTravelers || 1),
          date: new Date().toISOString(), // Current date in ISO format
          shipId: bookingDetails.shipId,
          userId: bookingDetails.userid,
          paymentId: Number(paymentID),
        };
        if (!selectedPaymentMethod) {
          alert("Please select a payment method.");
          return;
        }
        try {
          // Prepare the payload for your backend
          const productRequest = {
            name: bookingDetails.cruise.name,
            amount: bookingDetails.cruise.price * 100, // Amount in smallest currency unit
            quantity: bookingDetails.numTravelers || 1,
            currency: "INR",
            // successUrl: ${window.location.origin}/metronic8/react/demo8/home
          };
  
          const payment = await paymentService.initiatePayment( Number (bookingDetails.bookingId), productRequest.amount );
          const { paymentID: paymentIdFromResponse } = payment; // Extract paymentID from the response
          setPaymentID(paymentIdFromResponse); // Set paymentID to state
          console.log(paymentID)
    
          // Call the backend to create a Stripe session
          const response = await axios.post("http://localhost:8085/product/v1/checkout", productRequest);
          const { sessionUrl } = response.data;
    
          if (sessionUrl) {
            // Navigate to the Stripe checkout page
            window.location.href = sessionUrl;

            navigate("/receipt", {
              state: {
                cruise: bookingDetails.cruise,
                numTravelers: bookingDetails.numTravelers,
                userInfo: bookingDetails.userid,
                paymentMethod: selectedPaymentMethod,
                totalAmount: bookingDetails.cruise.price * (bookingDetails.numTravelers || 1),
                passengers:passengers,
                receipt:receiptData
              },
            });
          } else {
            alert("Failed to create payment session. Please try again.");
          }
        } catch (error) {
          console.error("Error creating payment session:", error);
          alert("An error occurred. Please try again later.");
        } 
       };
  


  return (
    <div className="container mt-4">
      <h3>Booking Summary</h3>
          
      <div className="card">
        <div className="card-body" style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px", marginRight: "20px" }}>
             <img
              src="https://images.unsplash.com/photo-1606255635975-92851ad290cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={bookingDetails.cruise.name}
              className="img-fluid"
              style={{ height: "400px", width:"400px", objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: "2  400px",margin:"10px" }}>
            <h1>{bookingDetails.cruise.name}</h1>
            <h4>CruiseType : {bookingDetails.cruise.cruiseType}</h4>
            <h4>Source : {bookingDetails.cruise.source}</h4>
            <h4>Destination : {bookingDetails.cruise.destination}</h4>
            <h5>
              <strong>Price:</strong> ₹{bookingDetails.cruise.price}
            </h5>
            <p>
              {/* <strong>Check-in Date:</strong> {bookingDetails.travelDate} */}
            </p>
            <h5>
              <strong>Number of Travelers:</strong>{" "}
              {bookingDetails.numTravelers}
            </h5>
          </div>
        </div>

        <div style={{ marginTop: "20px", padding: "10px" }}>
          <h1>Payment Details</h1>
          <h2> 
            <strong>Total Price:</strong> ₹
            {bookingDetails.cruise.price * (bookingDetails.numTravelers || 1)}
          </h2>

          <div className="mt-10">
          <div className="mt-4">
            <h1>Passenger Details</h1>
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

          <div className="mt-10">
            <h1>Select Payment Method:</h1>
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
    </div>
  );
};

export default SummaryPage;