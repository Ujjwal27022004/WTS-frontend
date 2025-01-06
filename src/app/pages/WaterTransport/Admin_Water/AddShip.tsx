import React, { useState } from "react";
import AdminService from "../../../../api/Service/WaterTransport/Admin/AdminService";

interface AddShipProps {
  onClose: () => void;
  onAdd: (ship: ShipDetail) => void;
}

interface ShipDetail {
  shipId: number; // Now required and manually entered
  name: string;
  source: string;
  destination: string;
  cruiseLength: number;
  cruiseType: string; // Should match the CruiseType enum in backend
  date: string; // "yyyy-MM-dd" format
  rating: number;
  availability: boolean;
}

const AddShip: React.FC<AddShipProps> = ({ onClose, onAdd }) => {
  const [newShip, setNewShip] = useState<ShipDetail>({
    shipId: 0, // Default value; manually entered
    name: "",
    source: "",
    destination: "",
    cruiseLength: 0,
    cruiseType: "STANDARD", // Default value; adjust as per your enum
    date: "",
    rating: 0,
    availability: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewShip({
      ...newShip,
      [name]: name === "shipId" ? parseInt(value, 10) : value,
    });
  };

  const handleAddShip = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Adding ship:", newShip); // Debugging

    try {
      const addedShip = await AdminService.addShipDetails(newShip);
      onAdd(addedShip);
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to add ship. Please try again.");
      console.error("Error adding ship:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Ship</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleAddShip}>
              <div className="mb-3">
                <label className="form-label">Ship ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="shipId"
                  value={newShip.shipId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newShip.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Source</label>
                <input
                  type="text"
                  className="form-control"
                  name="source"
                  value={newShip.source}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Destination</label>
                <input
                  type="text"
                  className="form-control"
                  name="destination"
                  value={newShip.destination}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cruise Length (in days)</label>
                <input
                  type="number"
                  className="form-control"
                  name="cruiseLength"
                  value={newShip.cruiseLength}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cruise Type</label>
                <select
                  className="form-select"
                  name="cruiseType"
                  value={newShip.cruiseType}
                  onChange={handleInputChange}
                >
                  <option value="STANDARD">Standard</option>
                  <option value="LUXURY">Luxury</option>
                  <option value="ECONOMY">Economy</option>
                  {/* Add other enum options as per your backend */}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={newShip.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  name="rating"
                  value={newShip.rating}
                  onChange={handleInputChange}
                  min={0}
                  max={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Availability</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="availability"
                  checked={newShip.availability}
                  onChange={(e) =>
                    setNewShip({ ...newShip, availability: e.target.checked })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Adding..." : "Add Ship"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShip;