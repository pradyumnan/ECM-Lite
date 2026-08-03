import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2>ECM Lite</h2>

            <NavLink to="/dashboard">Dashboard</NavLink>

            <NavLink to="/upload">Upload</NavLink>

            <NavLink to="/search">Search</NavLink>

            <NavLink to="/users">Users</NavLink>

            <NavLink to="/settings">Settings</NavLink>

            <NavLink to="/documents">Documents</NavLink>

        </div>

    );

}

export default Sidebar;