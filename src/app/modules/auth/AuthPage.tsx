import { Route, Routes } from "react-router-dom";
import { ForgotPassword } from "./components/ForgotPassword";
import Signup from "./components/Registration";
import Login from "./components/Login";
import { AuthLayout } from "./AuthLayout";


const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
