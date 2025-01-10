import React, { useEffect, useState } from "react";
import { UserService } from "../../../../api/Service/WaterTransport/User/UserService";
import { User } from "../../../../api/Model/WaterTransport/User/user";
import Pagination from "../../Pagination";

export const ShipUserPage: React.FC = () => {
  const userService = new UserService();

  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [searchId, setSearchId] = useState(""); // State for searching by ID
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Edit Modal State:", showEditModal, "Edit User:", editUser);
  }, [showEditModal, editUser]);

  const fetchUsers = async () => {
    try {
      const allUsers = await userService.getAllUsers();
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredUsers(
      users.filter((user: User) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSearchById = async () => {
    try {
      const user = await userService.getUserById(parseInt(searchId, 10));
      setFilteredUsers(user ? [user] : []);
    } catch (error) {
      console.error("Error searching user by ID:", error);
    }
  };

  const handleEdit = (user: User) => {
    console.log("Editing user:", user); // Debugging log
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (!editUser) return;
    try {
      await userService.editUser(editUser);
      fetchUsers();
      setShowEditModal(false);
      setEditUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Ship Users</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Users: {filteredUsers.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          {/* Search by Name */}
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search by Name"
            value={search}
            onChange={handleSearchChange}
          />

          {/* Search by ID */}
          <input
            type="text"
            className="form-control border-1 border-secondary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            className="btn btn-primary mx-2"
            onClick={handleSearchById}
            disabled={!searchId}
          >
            Search by ID
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((user: User) => (
                  <tr key={user.userid}>
                    <td>{user.username || "No Name"}</td>
                    <td>{user.email || "No Email"}</td>
                    <td>
                      <button
                        className="btn btn-dark mx-1"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Edit User Modal */}
      {showEditModal && editUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowEditModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              zIndex: 1001,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h3>Edit User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit();
              }}
            >
              <label>Name</label>
              <input
                type="text"
                value={editUser?.username || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, username: e.target.value })
                }
                style={{ display: "block", marginBottom: "10px" }}
              />
              <label>Email</label>
              <input
                type="email"
                value={editUser?.email || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                style={{ display: "block", marginBottom: "10px" }}
              />
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <button
                  type="submit"
                  style={{
                    marginRight: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
