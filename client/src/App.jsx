import "./App.css";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Documents from "./pages/Documents";

function App() {

    return (

        <div className="container">

            <Header />

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />

                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />

                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />

                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                
                <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />

            </Routes>

                <ToastContainer
                position="top-right"
                autoClose={2500}
                theme="dark"
            />

        </div>

    );

}

export default App;