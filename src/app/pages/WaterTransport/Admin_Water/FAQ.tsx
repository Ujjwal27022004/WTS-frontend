import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import {
  fetchAllQueries,
  resolveQuery,
} from "../../../../api/Service/WaterTransport/Admin/QueryResolutionService";
import EditFAQ from "./EditFAQ"; // Import the EditFAQ component

interface FAQ {
  queryid: number;
  user: { username: string };
  queryDetails: string | null;
  status: string;
  createdDate: string;
  resolvedDate: string | null;
  queryResolution: string | null;
}

export const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showEditQueryModal, setShowEditQueryModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<FAQ | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await fetchAllQueries();
        setFaqs(data);
      } catch (error) {
        alert("Failed to fetch queries. Please try again later.");
      }
    };
    fetchFAQs();
  }, []);

  const filteredFAQs = faqs.filter((faq) =>
    faq.queryDetails?.toLowerCase().includes(search.toLowerCase())
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

  const handleEditQuery = (query: FAQ) => {
    setSelectedQuery(query);
    setShowEditQueryModal(true);
  };

  const handleUpdateQuery = async () => {
    if (!selectedQuery) return;

    try {
      const updatedQuery = {
        ...selectedQuery,
        resolutionDate: new Date().toLocaleDateString(), // Automatically set the resolution date to today
      };

      const result = await resolveQuery(
        updatedQuery.queryid,
        updatedQuery.queryResolution || "",
        updatedQuery.status
      );

      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq.queryid === result.queryid ? result : faq
        )
      );
      setShowEditQueryModal(false);
      setSelectedQuery(null);
    } catch (error) {
      alert("Failed to update the query. Please try again.");
    }
  };

  const handleEditFAQ = (updatedFAQ: FAQ) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.queryid === updatedFAQ.queryid ? updatedFAQ : faq
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Queries</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Queries: {filteredFAQs.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Queries"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>User</th>
                <th>Query Details</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Resolution Date</th>
                <th>Resolution</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFAQs
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((faq) => (
                  <tr key={faq.queryid}>
                    <td>{faq.user.username}</td>
                    <td>{faq.queryDetails || "No details provided"}</td>
                    <td>{faq.status}</td>
                    <td>{new Date(faq.createdDate).toLocaleDateString()}</td>
                    <td>{faq.resolvedDate || "Not resolved"}</td>                    
                    <td>{faq.queryResolution || "No resolution provided"}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEditQuery(faq)}
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

      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredFAQs.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {showEditQueryModal && selectedQuery && (
        <EditFAQ
          faq={selectedQuery}
          onClose={() => setShowEditQueryModal(false)}
          onEdit={handleEditFAQ}
        />
      )}
    </div>
  );
};
