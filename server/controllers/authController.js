const userModel = require("../models/userModel");

async function login(req, res) {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            success: false,
            message: "Username and Password are required"
        });

    }

    try {

        const user = await userModel.findUser(username);

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid Username"
            });

        }

        if (user.password !== password) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        res.json({
            success: true,
            message: "Login Successful",
            user: {
                id: user.id,
                username: user.username,
                fullName: user.full_name,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

}

module.exports = {
    login
};