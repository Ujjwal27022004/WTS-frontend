import React, { useEffect, useState } from "react";
import { AdminData } from "../../../../api/Model/WaterTransport/Admin/WaterAdminInterface";
import AdminService from "../../../../api/Service/WaterTransport/Admin/AdminService";

export const AdminDashboard: React.FC = () => {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingAdminId, setEditingAdminId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await AdminService.getAllAdminDetails();
        setAdmins(data);
      } catch (err) {
        setError(err as string);
        console.error("Error fetching admin details:", err);
      }
    };

    fetchAdmins();
  }, []);

  const handleEditClick = (adminId: number) => {
    setEditingAdminId(adminId);
    setNewPassword(""); // Reset the new password input
  };

  const handleSaveClick = async (adminId: number) => {
    if (!newPassword) {
      setError("Password cannot be empty.");
      return;
    }

    try {
      await AdminService.updateAdminDetails({
        adminId: adminId,
        password: newPassword,
      });
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.adminId === adminId
            ? { ...admin, password: "" } // Mask the new password
            : admin
        )
      );
      setEditingAdminId(null);
      setNewPassword(""); // Clear input after successful update
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error updating admin password:", err);
      setError("Failed to update password. Please try again.");
    }
  };

  const handleCancelClick = () => {
    setEditingAdminId(null);
    setNewPassword("");
    setError(null); // Clear error on cancel
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Admin Details</h2>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Admin ID</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Password</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.adminId}>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.adminId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {admin.emailId}
                </td>
                
                <td className="border border-gray-300 px-4 py-2">
                  {editingAdminId === admin.adminId ? (
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded"
                      placeholder="Enter new password"
                    />
                  ) : (
                    "************"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingAdminId === admin.adminId ? (
                    <>
                      <button
                        onClick={() => handleSaveClick(admin.adminId)}
                        className="bg-green-500 text-black px-4 py-2 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="bg-gray-500 text-black px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(admin.adminId)}
                      className="bg-blue-500 text-black px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
