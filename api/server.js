// BUILD YOUR SERVER HERE
const express = require("express");
const cors = require("cors");
const User = require("./users/model");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({
                message: "The users information could not be retrieved",
            });
        });
});

app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist",
                });
            }
        })
        .catch(() =>
            res.status(404).json({
                message:
                    "There was an error while saving the user to the database",
            })
        );
});

app.post("/api/users", (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(404).json({
            message: "Please provide name and bio for the user",
        });
    } else {
        const newUser = { name, bio };
        User.insert(newUser)
            .then((user) => {
                res.status(201).json(user);
            })
            .catch(() => {
                res.status(400).json({
                    message:
                        "There was an error while saving the user to the database",
                });
            });
    }
});

app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    User.remove(id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist",
                });
            }
        })
        .catch(() => {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            });
        });
});

app.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user",
        });
    } else {
        User.update(id, { name, bio }).then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist",
                });
            }
        });
    }
});

app.use("*", (req, res) => {
    res.status(404).json({ message: "404 Not Found." });
});

module.exports = app; // EXPORT YOUR SERVER instead of {}
