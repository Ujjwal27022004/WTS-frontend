import React, { useState } from "react";
import { useAuth } from "../../auth/core/Auth";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../../api/Service/AuthServicewater";
import { LoginBasicInfo } from "../../../../api/Model/AuthInterfaceWater";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [type, setType] = useState("water");
  const { saveAuth } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const loginData: LoginBasicInfo = { email, password };

    let userData;
    if (isAdmin) {
      userData = await AuthService.Adminlogin(loginData);
    } else {
      userData = await AuthService.login(loginData);
    }

    console.log("User data:", userData);

    if (userData.status) {
      const userData = {
        api_token: "dummy-token",
        isAuthenticated: true,
      };
      // Save user state
      saveAuth(userData);

      // Navigate based on user type
      if (isAdmin) {
        navigate("/Water/Admindashboard");
      } else {
        switch (type) {
          case "water":
            navigate("/home");
            break;
          case "air":
            navigate("/air/homepage");
            break;
          case "ground":
            navigate("/ground/homepage");
            break;
          default:
            navigate("/");
        }
      }
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
      <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f8ff",
          }}
      >
        <form
            onSubmit={handleLogin}
            style={{
              maxWidth: "400px",
              width: "100%",
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
          <h2 className="text-center" style={{ color: "#17a2b8", marginBottom: "20px" }}>
            {isAdmin ? "Admin Login" : "User Login"}
          </h2>

          <div className="form-group">
            <label htmlFor="email" style={{ fontWeight: "bold" }}>Email</label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="form-control"
                style={{ marginBottom: "15px" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ fontWeight: "bold" }}>Password</label>
            <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="form-control"
                style={{ marginBottom: "15px" }}
            />
          </div>

          {error && (
              <div className="alert alert-danger" style={{ marginBottom: "15px" }}>
                {error}
              </div>
          )}

          <div className="text-center">
            <button
                type="submit"
                className="btn btn-info"
                style={{ width: "100%", padding: "10px" }}
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4" style={{ marginTop: "20px" }}>
            <p>
              {isAdmin ? (
                  <>
                    Not an admin?{' '}
                    <a
                        href="#"
                        onClick={() => setIsAdmin(false)}
                        style={{ color: "#17a2b8", textDecoration: "none", fontWeight: "bold" }}
                    >
                      Login as User
                    </a>
                  </>
              ) : (
                  <>
                    Are you an admin?{' '}
                    <a
                        href="#"
                        onClick={() => setIsAdmin(true)}
                        style={{ color: "#17a2b8", textDecoration: "none", fontWeight: "bold" }}
                    >
                      Login as Admin
                    </a>
                  </>
              )}
            </p>
            {!isAdmin && (
                <p>
                  Don't have an account?{' '}
                  <a
                      href="auth/registration"
                      style={{ color: "#17a2b8", textDecoration: "none", fontWeight: "bold" }}
                  >
                    Register here
                  </a>
                </p>
            )}
          </div>
        </form>
      </div>
  );
};

export default Login;
