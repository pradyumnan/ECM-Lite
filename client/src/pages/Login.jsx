import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login</h2>

        <div className="form-group">
          <label>Username</label>

        <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onChange={(e) => {
            setUsername(e.target.value);
            setError("");
        }}
        />
        </div>

        <div className="form-group">
          <label>Password</label>

        <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onChange={(e) => {
            setPassword(e.target.value);
            setError("");
        }}
        />
        </div>

                    {
                error && (
                    <p className="error-message">
                        {error}
                    </p>
                )
        }
        
                            {
            message && (
                <p className="success-message">
                    {message}
                </p>
            )
        }

        <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
        >
            {loading ? "Logging in..." : "Login"}
        </button>


      </div>
    </div>
  );

async function handleLogin() {

    if (username.trim() === "") {
        setError("Username is required");
        return;
    }

    if (password.trim() === "") {
        setError("Password is required");
        return;
    }

    setError("");

    try {

        console.log("Sending request to backend...");

        const response = await axios.post(
            "http://localhost:5000/api/login",
            {
                username,
                password
            }
        );

        setMessage(response.data.message);

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        setError("");

                setTimeout(() => {

            navigate("/dashboard");

        }, 1000);

    } 

        catch(error){

        if(error.response){

            setError(error.response.data.message);

        }
        else{

            setError("Server is not reachable");

        }

        setMessage("");

    }
}

}



export default Login;