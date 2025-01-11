import React, { useState } from "react";
import { RevenueService } from "../../../../api/Service/WaterTransport/Admin/RevenueService";

export const RevenuePage: React.FC = () => {
    const [shipId, setShipId] = useState<string>("");
    const [revenue, setRevenue] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchRevenue = async () => {
        setError(null);
        setRevenue(null);
        try {
            const revenueData = await RevenueService.getRevenueByShipId(Number(shipId));
            setRevenue(revenueData);
        } catch (err: any) {
            setError(err.response?.data || "An error occurred while fetching revenue.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Revenue Details</h1>
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="number"
                    value={shipId}
                    onChange={(e) => setShipId(e.target.value)}
                    placeholder="Enter Ship ID"
                    style={{
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginRight: "10px",
                    }}
                />
                <button
                    onClick={fetchRevenue}
                    style={{
                        padding: "8px 15px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Fetch Revenue
                </button>
            </div>
            {revenue !== null && (
                <div style={{ color: "green" }}>
                    <strong>Revenue:</strong> ₹{revenue}
                </div>
            )}
            {error && (
                <div style={{ color: "red" }}>
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
};

