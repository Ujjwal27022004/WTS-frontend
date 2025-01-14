import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../../api/Service/AuthServicewater";
import { SignUpBasicInfo } from "../../../../api/Model/AuthInterfaceWater";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!username || !email || !password) {
            setError("Username, Email, and Password are required.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const SignUpData: SignUpBasicInfo = { username, email, password }; // Create signupData object

        try {
            const userData = await AuthService.signup(SignUpData);
            console.log("User data:", userData);
            navigate("/auth/login");
        } catch (err) {
            console.error("Signup failed:", err);
            setError("Signup failed. Please try again.");
        }
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
                onSubmit={handleSignup}
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
                    Signup
                </h2>

                <div className="form-group">
                    <label
                        htmlFor="username"
                        style={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            marginBottom: "8px",
                            display: "block",
                        }}
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError(""); // Clear error on input change
                        }}
                        className="form-control"
                        style={{
                            marginBottom: "15px",
                            padding: "10px",
                            border: "1px solid #ced4da",
                            borderRadius: "8px",
                            width: "100%",
                        }}
                    />
                </div>

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
                            setError(""); // Clear error on input change
                        }}
                        className="form-control"
                        style={{
                            marginBottom: "15px",
                            padding: "10px",
                            border: "1px solid #ced4da",
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
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(""); // Clear error on input change
                        }}
                        className="form-control"
                        style={{
                            marginBottom: "15px",
                            padding: "10px",
                            border: "1px solid #ced4da",
                            borderRadius: "8px",
                            width: "100%",
                        }}
                    />
                </div>

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
                        Signup
                    </button>
                </div>

                <div className="text-center mt-4" style={{ marginTop: "20px" }}>
                    <p style={{ fontSize: "14px" }}>
                        Already have an account?{" "}
                        <a
                            href="login"
                            style={{
                                color: "#007bff",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Login here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;