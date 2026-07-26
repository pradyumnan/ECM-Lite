import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login</h2>

        <div className="form-group">
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
          />
        </div>

        <button className="login-btn">
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;