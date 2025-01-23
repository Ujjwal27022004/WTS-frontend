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

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;
  }

  if (!receiptDetails) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Receipt not found.</p>;
  }

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
        <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333", textTransform: "uppercase" }}>
          Payment Receipt
        </h3>
        <div id="receipt" className="card" style={{ border: "none", backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px" }}>
          <div className="card-body">
            <h5 style={{ fontSize: "18px", fontWeight: "bold", color: "#555", marginBottom: "15px", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
              Booking Summary
            </h5>
            <p><strong>Receipt ID:</strong> {receiptDetails.receiptId}</p>
            <p><strong>Amount Paid:</strong> ₹{receiptDetails.amount}</p>
            <p><strong>Date:</strong> {new Date(receiptDetails.date).toLocaleDateString()}</p>
            <p><strong>Ship Name:</strong> {receiptDetails.ship.name}</p>
            <p><strong>User:</strong> {receiptDetails.user.username}</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
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
      <ChatBotComponent />
    </>
  );
};

export default ReceiptPage;
