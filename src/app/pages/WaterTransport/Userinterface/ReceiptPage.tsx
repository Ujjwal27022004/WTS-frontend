import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ReceiptPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const receiptDetails = location.state as {
    cruise: {
      name: string;
      image: string;
      price: number;
      shipId: string;
    };
    travelDate: string;
    numTravelers: number;
    userInfo: {
      name: string;
      email: string;
      phone: string;
    };
    paymentMethod: string;
    totalAmount: number;
    receiptId: string;
  };

  if (!receiptDetails) {
    navigate("/");
    return null;
  }

  const handleDownloadReceipt = async () => {
    const receiptElement = document.getElementById("receipt");
    if (!receiptElement) return;

    const canvas = await html2canvas(receiptElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${receiptDetails.receiptId}.pdf`);
  };

  return (
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
        id="receipt" // Add ID for capturing the receipt
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
              <strong>Ship Name:</strong> {receiptDetails.cruise.name}
            </p>
            <p>
              <strong>Ship ID:</strong> {receiptDetails.cruise.shipId}
            </p>
            <p>
              <strong>Travel Date:</strong> {receiptDetails.travelDate}
            </p>
            <p>
              <strong>Number of Travelers:</strong>{" "}
              {receiptDetails.numTravelers}
            </p>
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
            User Information
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
              <strong>Name:</strong> {receiptDetails.userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {receiptDetails.userInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {receiptDetails.userInfo.phone}
            </p>
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
              <strong>Total Amount Paid:</strong> ₹{receiptDetails.totalAmount}
            </p>
            <p>
              <strong>Receipt ID:</strong> {receiptDetails.receiptId}
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

      {/* Download Button */}
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
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
          }}
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;
