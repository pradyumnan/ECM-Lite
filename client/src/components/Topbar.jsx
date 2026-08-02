import "./Topbar.css";
import { useNavigate } from "react-router-dom";

function Topbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    function handleLogout() {

        localStorage.removeItem("user");

        navigate("/");

    }

    return (

        <div className="topbar">

            <div>

                <h3>Welcome, {user.fullName}</h3>

                <p>{user.role}</p>

            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>

    );

}

export default Topbar;