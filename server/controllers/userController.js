const pool = require("../db/db");

const getUsers = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT id, username, full_name, role FROM users ORDER BY id"
        );

        res.json(result.rows);

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    getUsers
};

const addUser = async (req, res) => {

    try {

        const {
            username,
            password,
            fullName,
            role
        } = req.body;

        await pool.query(
            `INSERT INTO users
            (username,password,full_name,role)
            VALUES($1,$2,$3,$4)`,
            [
                username,
                password,
                fullName,
                role
            ]
        );

        res.json({
            message: "User Added"
        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

};

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM users WHERE id=$1",
            [id]
        );

        res.json({
            message: "User Deleted"
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const updateUser = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            username,
            password,
            fullName,
            role
        } = req.body;

        if (password && password.trim() !== "") {

            await pool.query(
                `UPDATE users
                 SET username=$1,
                     password=$2,
                     full_name=$3,
                     role=$4
                 WHERE id=$5`,
                [
                    username,
                    password,
                    fullName,
                    role,
                    id
                ]
            );

        } else {

            await pool.query(
                `UPDATE users
                 SET username=$1,
                     full_name=$2,
                     role=$3
                 WHERE id=$4`,
                [
                    username,
                    fullName,
                    role,
                    id
                ]
            );

        }

        res.json({
            message: "User Updated"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

module.exports = {

    getUsers,
    addUser,
    deleteUser,
    updateUser

};