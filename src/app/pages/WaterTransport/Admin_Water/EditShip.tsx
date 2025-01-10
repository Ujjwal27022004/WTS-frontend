import React, { useState } from "react";
import AdminService from "../../../../api/Service/WaterTransport/Admin/AdminService";

interface EditShipProps {
  onClose: () => void;
  onEdit: (updatedShip: ShipDetail) => void;
  ship: ShipDetail; // The ship to be edited
}

interface ShipDetail {
  shipId: number;
  name: string;
  source: string;
  destination: string;
  cruiseLength: number;
  cruiseType: string;
  date: string;
  rating: number;
  availability: boolean;
}

const EditShip: React.FC<EditShipProps> = ({ onClose, onEdit, ship }) => {
  const [editedShip, setEditedShip] = useState<ShipDetail>({ ...ship });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedShip({
      ...editedShip,
      [name]: name === "shipId" ? parseInt(value, 10) : value,
    });
  };

  const handleEditShip = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Editing ship:", editedShip); // Debugging

    try {
      const updatedShip = await AdminService.editShipDetails(editedShip);
      onEdit(updatedShip); // Pass updated ship details back to parent
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to edit ship. Please try again.");
      console.error("Error updating ship:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Ship</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleEditShip}>
              <div className="mb-3">
                <label className="form-label">Ship ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="shipId"
                  value={editedShip.shipId}
                  onChange={handleInputChange}
                  disabled // Ship ID is immutable
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editedShip.name}
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
                  value={editedShip.source}
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
                  value={editedShip.destination}
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
                  value={editedShip.cruiseLength}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cruise Type</label>
                <select
                  className="form-select"
                  name="cruiseType"
                  value={editedShip.cruiseType}
                  onChange={handleInputChange}
                >
                  <option value="FAMILY">FAMILY</option>
                  <option value="LUXURY">LUXURY</option>
                  <option value="DELUXE">DELUXE</option>
                  <option value="PREMIUM">PREMIUM</option>
                  {/* Add other enum options as per your backend */}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={editedShip.date}
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
                  value={editedShip.rating}
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
                  checked={editedShip.availability}
                  onChange={(e) =>
                    setEditedShip({
                      ...editedShip,
                      availability: e.target.checked,
                    })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditShip;
