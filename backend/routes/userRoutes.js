// Importing required packages
const express = require("express");
const User = require("./../models/User");

// Required routers
const userRouter = express.Router();

// Middleware for incoming data to be of json format
userRouter.use(express.json());

// Define the routes needed for the application 

// Get all users
userRouter.get("/", async (req, res) => {
    try {
        let result = await User.find();
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No users found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get user by id
userRouter.get("/:id", async (req, res) => {
    let userId = req.params.id;
    try {
        let result = await User.findById(userId);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a new user
userRouter.post("/new", async (req, res) => {
    try {
        let { username, password, email } = req.body;
        let user = await User.findOne({ username });
        if (!user) {
            let result = new User({ username, password, email });
            await result.save();
            res.status(201).send("User created successfully");
        } else {
            res.status(409).json({ message: "Username already exists" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Uncomment and complete the routes below when needed

// Update user (pending)
// userRouter.put("/edit/:id", async (req, res) => {
//     try {
//         let userId = req.params.id;
//         let updatedData = req.body;
//         let result = await User.findByIdAndUpdate(userId, updatedData, { new: true });
//         if (result) {
//             res.status(200).json(result);
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// Delete user (pending)
// userRouter.delete("/delete/:id", async (req, res) => {
//     try {
//         let userId = req.params.id;
//         let result = await User.findByIdAndDelete(userId);
//         if (result) {
//             res.status(200).json({ message: "User deleted successfully" });
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// Exporting modules
module.exports = userRouter;
