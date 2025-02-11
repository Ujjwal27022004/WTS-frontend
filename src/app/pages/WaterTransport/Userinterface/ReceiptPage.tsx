import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReceipt } from "../../../../api/Service/WaterTransport/User/ReceiptService"
import { ReceiptDTO } from "../../../../api/Model/WaterTransport/User/Receipt";
import ChatBotComponent from "./ChatBotComponent";

const ReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReceipt = async () => {
      const receiptId = localStorage.getItem("receiptId");
      // if (!receiptId) {
      //   navigate("/");
      //   return;
      // }

      try {
        const receiptData = await getReceipt(Number(receiptId));
        setReceiptDetails(receiptData);
      } catch (error) {
        console.error("Error fetching receipt:", error);
        // navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [navigate]);

  const handleDownloadReceipt = async () => {
    const receiptElement = document.getElementById("receipt");
    if (!receiptElement) return;

    const canvas = await html2canvas(receiptElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${receiptDetails?.receiptId}.pdf`);
  };

  const handleReturnHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div
        className="container mt-4"
        style={{
          maxWidth: "800px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            textTransform: "uppercase",
          }}
        >
          Payment Receipt
        </h3>
        <div
          id="receipt"
          className="card"
          style={{
            border: "none",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div className="card-body">
            <h5
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#555",
                marginBottom: "15px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "5px",
              }}
            >
              Booking Summary
            </h5>
            <div
              style={{
                lineHeight: "1.8",
                fontSize: "14px",
                color: "#444",
                marginBottom: "20px",
              }}
            >
              <p>
                <strong>Ship ID:</strong> {receiptDetails.cruise.shipId}
              </p>
              <p>
                <strong>Ship Name:</strong> {receiptDetails.cruise.name}
              </p>
              <p>
                <strong>Source:</strong> {receiptDetails.cruise.source}
              </p>
              <p>
                <strong>Destination:</strong>{" "}
                {receiptDetails.cruise.destination}
              </p>
              <p>
                <strong>Travel Date:</strong> {receiptDetails.cruise.date}
              </p>
              <p>
                <strong>Number of Travelers:</strong>{" "}
                {receiptDetails.numTravelers}
              </p>
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#555",
                  marginBottom: "15px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "5px",
                }}
              >
                Passenger Details:
              </h5>
              {receiptDetails.passengers.length > 0 ? (
                <ul>
                  {receiptDetails.passengers.map((passenger, index) => (
                    <li key={index}>
                      Passenger {index + 1}
                      <br />
                      <strong>Name</strong> : {passenger.name} <br />{" "}
                      <strong>Age</strong> : {passenger.age} years old <br />{" "}
                      <strong>Gender</strong> : {passenger.gender}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No passengers found.</p>
              )}
            </div>

            <h5
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#555",
                marginBottom: "15px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "5px",
              }}
            >
              Payment Details
            </h5>
            <div
              style={{
                lineHeight: "1.8",
                fontSize: "14px",
                color: "#444",
                marginBottom: "20px",
              }}
            >
              <p>
                <strong>Payment Method:</strong> {receiptDetails.paymentMethod}
              </p>
              <p>
                <strong>Total Amount Paid:</strong> ₹
                {receiptDetails.totalAmount}
              </p>
            </div>

            <h5
              style={{
                textAlign: "center",
                color: "#28a745",
                marginTop: "30px",
                fontSize: "16px",
              }}
            >
              Thank You!
            </h5>
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#555",
                marginTop: "10px",
              }}
            >
              Your booking has been confirmed. Enjoy your journey!
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px 20px" }}>
          <button
            className="btn btn-primary"
            onClick={handleDownloadReceipt}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Download Receipt
          </button>
          <button
            className="btn btn-primary"
            onClick={handleReturnHome}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Return Home
          </button>
        </div>
      </div>
      <ChatBotComponent />
    </>
  );
};

export default ReceiptPage;
