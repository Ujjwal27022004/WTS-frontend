import React, { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import AddShip from "./AddShip";
import { ShipDetails } from "../../../../api/Model/WaterTransport/Admin/ShipInterface";
import { ShipService } from "../../../../api/Service/WaterTransport/Admin/ShipService";
import axios from "axios";

export const ShipsPage: React.FC = () => {
  const [ships, setShips] = useState<ShipDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddShipModal, setShowAddShipModal] = useState(false);
  const [status, setStatus] = useState("");

  const shipService = new ShipService();

  useEffect(() => {
    const fetchShipDetails = async () => {
      try {
        const response = await fetch("/shipdetails");
        if (!response.ok) throw new Error("Failed to fetch ship details");
        const data = await response.json();
        setShips(data);
      } catch (error) {
        console.error("Error fetching ship details:", error);
        setShips([]); // Fallback to empty array if API fails
      }
    };

    fetchShipDetails();
  }, []);

  const filteredShips = ships
    .filter((ship) => ship.name.toLowerCase().includes(search.toLowerCase()))
    .filter((ship) => (status ? ship.cruiseType === status : true));

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

  const toggleAvailability = async (id: number) => {
    try {
      await shipService.toggleAvailability(id);
      setShips(
        ships.map((ship) =>
          ship.shipId === id
            ? { ...ship, availability: !ship.availability }
            : ship
        )
      );
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  const handleAddShip = async (newShip: ShipDetails) => {
    try {
      const response = await fetch("/api/admindetails/Shipadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShip),
      });

      if (!response.ok) throw new Error("Failed to add new ship");

      const data = await response.json();
      setShips((prevShips) => [...prevShips, data]); // Update ships list with the new ship
    } catch (error) {
      console.error("Error adding new ship:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Ships</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Ships: {filteredShips.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Ships"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="d-flex align-items-center">
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">
              Sort By:
            </span>
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Active">Active</option>
              <option value="Cargo">Cargo</option>
              <option value="Passenger">Passenger</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddShipModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New Ship
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Name</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShips
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((ship) => (
                  <tr key={ship.shipId}>
                    <td>{ship.name}</td>
                    <td>{ship.cruiseType}</td>
                    <td>{(ship.capacity = 200)}</td>
                    <td>{ship.availability ? "Available" : "Unavailable"}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={ship.availability}
                        onChange={() => toggleAvailability(ship.shipId)}
                      />
                    </td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button className="btn btn-icon btn-bg-light btn-sm me-1">
                          <i className="ki-duotone ki-eye fs-3 text-primary"></i>
                        </button>
                        <button className="btn btn-icon btn-bg-light btn-sm me-1">
                          <i className="ki-duotone ki-pencil fs-3 text-primary"></i>
                        </button>

                        <button className="btn btn-icon btn-bg-light btn-sm me-1">
                          <i className="ki-duotone ki-trash fs-3 text-danger"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredShips.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {showAddShipModal && (
        <AddShip
          onClose={() => setShowAddShipModal(false)}
          onAdd={handleAddShip}
        />
      )}
    </div>
  );
};