import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../../api/Service/AuthService";
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

        const SignUpData: SignUpBasicInfo = {username , email, password }; // Create signupData object

        try {
            // Call AuthService.signup to hit the API (assuming signup API exists)
            const userData = await AuthService.signup(SignUpData);

            // Optionally, store userData or use it as needed
            console.log("User data:", userData);

            // Navigate to the dashboard after successful signup
            navigate("/auth/login");
        } catch (err) {
            console.error("Signup failed:", err);
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSignup} style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2 className="text-center">Signup</h2>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError(""); // Clear error on input change
                    }}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(""); // Clear error on input change
                    }}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(""); // Clear error on input change
                    }}
                    className="form-control"
                />
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="text-center mt-4">
                <button type="submit" className="btn btn-info">
                    Signup
                </button>
            </div>
        </form>
    );
};

export default Signup;
