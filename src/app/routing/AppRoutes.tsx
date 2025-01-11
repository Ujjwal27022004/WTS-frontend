/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { Logout, AuthPage, useAuth } from "../modules/auth";
import { App } from "../App";
import HomeMain from "../pages/WaterTransport/Userinterface/HomeMain";
import Search from "../pages/WaterTransport/Userinterface/Search";
import ReceiptPage from "../pages/WaterTransport/Userinterface/ReceiptPage";
/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env;

// const AppRoutes: FC = () => {
//   const { currentUser } = useAuth();
//   return (
//     <BrowserRouter basename={BASE_URL}>
//       <Routes>
//         <Route element={<App />}>
//           <Route path="error/*" element={<ErrorsPage />} />
//           <Route path="logout" element={<Logout />} />
//           {currentUser ? (
//             <>
//               <Route path="/*" element={<PrivateRoutes />} />
//               <Route index element={<Navigate to="/dashboard" />} />
//             </>
//           ) : (
//             <>
//               <Route path="auth/*" element={<AuthPage />} />
//               <Route path="*" element={<Navigate to="/auth" />} />
//             </>
//           )}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export { AppRoutes };

const AppRoutes: FC = () => {
  const { auth } = useAuth(); // Use auth instead of currentUser

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {auth ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route path="home" element={<HomeMain />} /> {/* HomeMain Route */}
              <Route path="search" element={<Search />} /> {/* Search Route */}
              <Route path="/receipt" element={<ReceiptPage />} />
              <Route index element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>

            
          )}
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
};
export { AppRoutes };
