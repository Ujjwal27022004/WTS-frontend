import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/core/Auth";

interface LoginBasicInfo {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("water");
  const [error, setError] = useState<string | null>(null);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!type || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginData: LoginBasicInfo = { email, password };

    try {
      // Mock API response
      const userData = {
        api_token: "dummy-token",
        isAuthenticated: true,
      };

      // Save user state
      saveAuth(userData);

      // Navigate based on the service type
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
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials or login error.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Service Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="water">Water</option>
            <option value="air">Air</option>
            <option value="ground">Ground</option>
          </select>
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
