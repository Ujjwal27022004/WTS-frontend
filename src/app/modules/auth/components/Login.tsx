import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../../api/Service/AuthServicewater";
import { LoginBasicInfo } from "../../../../api/Model/AuthInterfaceWater";
import { useAuth } from "../core/Auth.tsx";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState<number | null>(null);
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { saveAuth } = useAuth();

  // Function to generate random math CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1-10
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion(`${num1} + ${num2}`);
    setCaptchaAnswer(num1 + num2);
  };

  // Generate CAPTCHA when component loads
  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateForm = () => {
    if (!email || !password || !selectedOption) {
      setError("All fields are required. Please complete the form.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (parseInt(captchaInput) !== captchaAnswer) {
      setError("Captcha is incorrect. Please try again.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      generateCaptcha(); // Regenerate the CAPTCHA if validation fails
      return;
    }

    const loginData: LoginBasicInfo = { email, password };

    try {
      if (selectedOption === "Admin") {
        const adminData = await AuthService.Adminlogin(loginData);

        if (adminData.status && adminData.role === "admin") {
          console.log("Navigating to Admin Dashboard");
          saveAuth(adminData);
          navigate("/Water/Admindashboard");
        } else {
          setError("Invalid admin credentials.");
        }
      } else {
        const userData = await AuthService.login(loginData);

        if (userData.status && userData.role === "user") {
          console.log("Navigating to User Dashboard");
          saveAuth(userData);
          navigate("/home");
        } else {
          setError("Invalid user credentials.");
        }
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Login error:", err.message);
      generateCaptcha(); // Reset CAPTCHA on error
    }
  };

  const getInputStyle = (value: string, regex: RegExp) => {
    if (!value) return {};
    return regex.test(value)
      ? { border: "2px solid green" }
      : { border: "2px solid red" };
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f7f9fc",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className="text-center"
          style={{
            color: "#007bff",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Login
        </h2>

        <div className="form-group">
          <label
            htmlFor="email"
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Email
          </label>
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
            style={{
              ...getInputStyle(email, /\S+@\S+\.\S+/),
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
            }}
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="password"
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="form-control"
              style={{
                ...getInputStyle(password, /.{4,}/),
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "8px",
                width: "100%",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {showPassword ? "🙉" : "🙈"}
            </button>
          </div>
        </div>

        <div className="form-group">
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Select an Option:
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            {["Water", "Air", "Ground"].map((option) => (
              <button
                type="button"
                key={option}
                className={`btn ${
                  selectedOption === option
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setSelectedOption(option)}
                style={{
                  flex: "1",
                  padding: "10px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  fontWeight: "bold",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
  <div
    style={{
      border: "2px solid pink", /* Red border around the CAPTCHA box */
      borderRadius: "8px", /* Rounded corners */
      boxShadow: "0 4px 8px rgba(210, 144, 144, 0.2)", /* Subtle red shadow */
      padding: "20px", /* Padding inside the CAPTCHA box */
      marginBottom: "15px", /* Space below the CAPTCHA box */
      marginTop: "20px", /* Added top margin for spacing before CAPTCHA box */
    }}
  >
    <label
      style={{
        fontWeight: "bold",
        fontSize: "14px",
        marginBottom: "8px",
        display: "block",
      }}
    >
      Solve the CAPTCHA: <span style={{ fontSize: "18px", fontWeight: "bold", color: "#3c8dbc" }}>{captchaQuestion}</span>
    </label>
    <input
      type="text"
      placeholder="Enter your answer"
      value={captchaInput}
      onChange={(e) => {
        setCaptchaInput(e.target.value);
        setError("");
      }}
      className="form-control"
      style={{
        marginBottom: "15px",
        padding: "10px",
        border: "1px solid #ced4da",
        borderRadius: "8px",
        width: "100%",
        backgroundColor: "#f0f0f0", /* Light grey background */
        fontSize: "16px",
        color: "#333", /* Dark grey text */
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.12)", /* Subtle inner shadow */
        transition: "all 0.3s ease",
      }}
    />
  </div>
</div>

<style>
  {`
    .form-group .form-control:focus {
      border-color: #007bff; /* Blue border on focus */
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.3); /* Blue shadow on focus */
    }

    .form-group .form-control::placeholder {
      color: #888; /* Light grey placeholder text */
    }
    
    .form-group .form-control:disabled {
      background-color: #e9ecef; /* Slightly lighter grey when disabled */
    }
  `}
</style>


        {error && (
          <div
            className="alert alert-danger"
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div className="text-center" style={{ marginTop: "20px" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </div>

        <div className="text-center mt-4" style={{ marginTop: "20px" }}>
          <p style={{ fontSize: "14px" }}>
            Don't have an account?{" "}
            <a
              href="registration"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
