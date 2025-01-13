import React, { useState } from "react";
import { resolveQuery } from "../../../../api/Service/WaterTransport/Admin/QueryResolutionService";

interface EditFAQProps {
  onClose: () => void;
  onEdit: (updatedFAQ: FAQ) => void;
  faq: FAQ; // The FAQ to be edited
}

interface FAQ {
  queryid: number;
  user: { username: string };
  queryDetails: string | null;
  status: string;
  createdDate: string;
  resolutionDate: string | null;
  resolution: string | null;
}

const EditFAQ: React.FC<EditFAQProps> = ({ onClose, onEdit, faq }) => {
  const [editedFAQ, setEditedFAQ] = useState<FAQ>({ ...faq });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedFAQ({
      ...editedFAQ,
      [name]: value,
    });
  };

  const handleEditFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Assume resolveQuery is a service method that updates the FAQ resolution
      const updatedFAQ = await resolveQuery(
        editedFAQ.queryid,
        editedFAQ.resolution || "",
        editedFAQ.status
      );
      onEdit(updatedFAQ); // Pass updated FAQ details back to parent
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to edit FAQ. Please try again.");
      console.error("Error updating FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit FAQ</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleEditFAQ}>
              <div className="mb-3">
                <label className="form-label">User</label>
                <input
                  type="text"
                  className="form-control"
                  name="user"
                  value={editedFAQ.user.username}
                  disabled // User is immutable
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Query Details</label>
                <textarea
                  className="form-control"
                  name="queryDetails"
                  value={editedFAQ.queryDetails || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Resolution</label>
                <textarea
                  className="form-control"
                  name="resolution"
                  value={editedFAQ.resolution || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={editedFAQ.status}
                  onChange={handleInputChange}
                >
                  <option value="Open">Open</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Resolution Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="resolutionDate"
                  value={editedFAQ.resolutionDate || ""}
                  onChange={handleInputChange}
                  required
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

export default EditFAQ;
