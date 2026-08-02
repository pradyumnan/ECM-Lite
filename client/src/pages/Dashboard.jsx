import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Dashboard() {

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Topbar />

                <div className="dashboard-content">

                    <h1>Dashboard</h1>

                    <p>Welcome to ECM Lite</p>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;