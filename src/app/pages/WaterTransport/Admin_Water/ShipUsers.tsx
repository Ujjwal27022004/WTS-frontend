import React, { useState, useEffect } from "react";
import { UserService } from "../../../../api/Service/WaterTransport/User/UserService";
import { User } from "../../../../api/Model/WaterTransport/User/user";
import Pagination from "../../Pagination";

export const ShipUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(5);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const userService = new UserService();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await userService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on search and status
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) &&
      (status === "" || user.role === status) // Adjust as per the API role structure
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

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
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Ship Users"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="d-flex align-items-center">
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">
              Filter By Role:
            </span>
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Captain">Captain</option>
              <option value="Crew Member">Crew Member</option>
              <option value="Deckhand">Deckhand</option>
            </select>
          </div>
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
                .map((user) => (
                  <tr key={user.userid}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button className="btn btn-icon btn-bg-light btn-sm me-1">
                          <i className="ki-duotone ki-eye fs-3 text-primary" />
                        </button>
                        <button className="btn btn-icon btn-bg-light btn-sm me-1">
                          <i className="ki-duotone ki-pencil fs-3 text-primary" />
                        </button>
                        <button className="btn btn-icon btn-bg-light btn-sm me-1">
                          <i className="ki-duotone ki-trash fs-3 text-danger" />
                        </button>
                      </div>
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
    </div>
  );
};
