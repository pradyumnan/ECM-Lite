import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";
import { toast } from "react-toastify";

function Users() {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("User");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/users"
            );

            setUsers(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const addUser = async () => {

            if (
        username.trim() === "" ||
        password.trim() === "" ||
        fullName.trim() === ""
    ) {
        toast.error("All fields are required");
        return;
    }

    try {

        await axios.post(
            "http://localhost:5000/api/users",
            {
                username,
                password,
                fullName,
                role
            }
        );

        setUsername("");
        setPassword("");
        setFullName("");
        setRole("User");

        loadUsers();

        toast.success("User added successfully");

    }
    catch (error) {

        console.log(error);
        toast.error("Failed to add user");

    }

};

const deleteUser = async (id) => {

    try {

        if (!window.confirm("Delete this user?")) {
            return;
        }

        await axios.delete(
            `http://localhost:5000/api/users/${id}`
        );

        loadUsers();

        toast.success("User deleted successfully");

    }
    catch (error) {

        console.log(error);
        toast.error("Failed to delete user");

    }

};

const editUser = (user) => {

    setEditingId(user.id);

    setUsername(user.username);
    setPassword(user.password);
    setFullName(user.full_name);
    setRole(user.role);

};

const updateUser = async () => {

        if (
        username.trim() === "" ||
        fullName.trim() === ""
    ) {
        toast.error("Username and Full Name are required");
        return;
    }

    try {

        await axios.put(
            `http://localhost:5000/api/users/${editingId}`,
            {
                username,
                password,
                fullName,
                role
            }
        );

        setEditingId(null);

        setUsername("");
        setPassword("");
        setFullName("");
        setRole("User");

        loadUsers();

        toast.success("User updated successfully");

    }
    catch (error) {

        console.log(error);
        toast.error("Failed to update user");

    }

};

    return (

        <div className="users-container">

            <h1 className="users-title">Users</h1>

            <div className="user-form">

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option>Admin</option>
                <option>User</option>
            </select>

                <button
                    onClick={editingId ? updateUser : addUser}
                >
                    {editingId ? "Update User" : "Add User"}
                </button>

        </div>

            <table className="users-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.full_name}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="edit-btn"
                                            onClick={() => editUser(user)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default Users;