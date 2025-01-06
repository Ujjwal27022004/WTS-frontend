import React, { useEffect, useState } from "react";
import { UserService } from "../../../../api/Service/WaterTransport/User/UserService";
import { User } from "../../../../api/Model/WaterTransport/User/user";
import Pagination from "../../Pagination";
import "./ShipUserPage.css"; // Add a CSS file for modal styling

export const ShipUserPage: React.FC = () => {
  const userService = new UserService();

  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleEdit = (user: User) => {
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
                        className="btn btn-light mx-1"
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
        <div className="modal-overlay">
          <div className="modal">
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
              />
              <label>Email</label>
              <input
                type="email"
                value={editUser?.email || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
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
