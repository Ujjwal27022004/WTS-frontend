import React from "react";
import NavBar from "./NavBar";
import FilterPanel from "./FilterPanel";
import CruisePage from "./CruiseCard"; // Import the CruisePage component

function Search() {
  return (
    <div>
      <NavBar />
      {/* Main container with Flexbox layout */}
      <div className="d-flex mt-4">
        {/* Filter Panel on the left */}
        <div style={{ width: "30%" }}>
          <FilterPanel />
        </div>

        {/* Cruise Page content on the right */}
        <div style={{ width: "70%" }}>
          <CruisePage />
        </div>
      </div>
    </div>
  );
}

export default Search;

// import { useLocation } from "react-router-dom";

// const Search = () => {
//   const location = useLocation();
//   const ships = location.state?.ships || []; // Get ships data from state

//   return (
//     <div>
//       <NavBar />
//       <div className="d-flex mt-4">
//         <div style={{ width: "30%" }}>
//           <FilterPanel />
//         </div>
//         <div style={{ width: "70%" }}>
//           <div className="container mt-4">
//             {ships.length > 0 ? (
//               ships.map((ship, index) => (
//                 <div key={index} className="card mb-4 shadow-sm">
//                   <div className="row g-0">
//                     <div className="col-md-6">
//                       <img
//                         src={ship.image || "default-image.jpg"}
//                         alt={ship.name}
//                         className="img-fluid rounded-start"
//                         style={{ height: "200px", objectFit: "cover" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <div className="card-body">
//                         <h5 className="card-title">{ship.name}</h5>
//                         <p className="card-text">{ship.description}</p>
//                         <p className="card-text">
//                           <small className="text-muted">Rating: {ship.rating}</small>
//                         </p>
//                         <p className="card-text">
//                           <strong>Price: ₹{ship.price}</strong>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No ships available for the selected source and destination.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <footer>Discount Section</footer>
//     </div>
//   );
// };

// export default Search;
