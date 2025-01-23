import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { AnimatedCheckmark } from "./animated-checkmark";
import { ArrowRight, CreditCard, Calendar, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessfulPayment() {
  const controls = useAnimation();
  const [showDetails, setShowDetails] = useState(false);

  const navigate = useNavigate();  // useNavigate instead of useHistory

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleString("en-US", {
      weekday: "short", // Day of the week
      month: "short",   // Abbreviated month
      day: "numeric",   // Day of the month
      year: "numeric",  // Full year
      hour: "2-digit",  // 12-hour format
      minute: "2-digit", // Minutes with leading zeros
    }));
  }, []); 

  const handleClick = () => {
    navigate("/home");  // Navigate to the home route
  };

  useEffect(() => {
    controls.start({
      y: [50, 0],
      opacity: [0, 1],
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e6f7eb, #e6f0fc)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        style={{
          background: "#ffffff",
          borderRadius: "1.5rem",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          maxWidth: "28rem",
          width: "100%",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <AnimatedCheckmark />
        </div>
        <motion.h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#1f2937",
            marginBottom: "1rem",
          }}
          animate={controls}
        >
          Payment Successful!
        </motion.h1>
        <motion.p
          style={{
            fontSize: "1.125rem",
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "1.5rem",
          }}
          animate={controls}
        >
          Thank you for your purchase. Your transaction has been completed successfully.
        </motion.p>
        <motion.div
          style={{
            background: "#f9fafb",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
          animate={controls}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#6b7280" }}>
              {/* Amount Paid */}
            </span>
            {/* <span style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#1f2937" }}>$99.99</span> */}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#6b7280" }}>
              Transaction ID
            </span>
            <span style={{ fontSize: "0.875rem", color: "#1f2937" }}>#123456789</span>
          </div>
        </motion.div>
        <motion.div animate={controls}>
        <button
      style={{
        backgroundColor: "#10b981",
        color: "#ffffff",
        fontWeight: "bold",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        width: "100%",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
      }}
      onClick={handleClick}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
    >
      Go to Dashboard
      <ArrowRight style={{ marginLeft: "0.5rem", height: "1.25rem", width: "1.25rem" }} />
    </button>
          <button
            style={{
              color: "#10b981",
              fontWeight: "500",
              fontSize: "0.875rem",
              width: "100%",
              cursor: "pointer",
              transition: "color 0.3s ease-in-out",
            }}
            onClick={() => setShowDetails(!showDetails)}
            onMouseOver={(e) => (e.target.style.color = "#059669")}
            onMouseOut={(e) => (e.target.style.color = "#10b981")}
          >
            {showDetails ? "Hide" : "View"} Payment Details
          </button>
        </motion.div>
      </motion.div>
      {showDetails && (
        <motion.div
          style={{
            background: "#ffffff",
            borderRadius: "1.5rem",
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            padding: "1.5rem",
            maxWidth: "28rem",
            width: "100%",
            marginTop: "1rem",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "1rem",
            }}
          >
            Payment Details
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CreditCard style={{ height: "1.25rem", width: "1.25rem", color: "#9ca3af", marginRight: "0.75rem" }} />
              <span style={{ color: "#6b7280" }}>Card ending in 1234 Days</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
      <Calendar
        style={{
          height: "1.25rem",
          width: "1.25rem",
          color: "#9ca3af",
          marginRight: "0.75rem",
        }}
      />
      <span style={{ color: "#6b7280" }}>{currentDate}</span>
    </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Lock style={{ height: "1.25rem", width: "1.25rem", color: "#9ca3af", marginRight: "0.75rem" }} />
              <span style={{ color: "#6b7280" }}>Secure Payment</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
