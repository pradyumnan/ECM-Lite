import "./Login.css";
import { useState } from "react";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

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

        function handleLogin() {

            if (username.trim() === "") {

                setError("Username is required");
                return;

            }

            if (password.trim() === "") {

                setError("Password is required");
                return;

            }

            setError("");


            setLoading(true);

            console.log("Logging in...");

                setTimeout(() => {

                console.log("Login Successful");

                setLoading(false);

            }, 3000);

        }

}



export default Login;