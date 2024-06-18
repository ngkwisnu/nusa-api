const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

// Menampilkan semua data user
router.get("/", UserController.getAllUser);
// Menampilkan user sesuai dengan id
router.get("/:id", UserController.getUserById);
// Menambahkan data user
router.post("/", UserController.addUser);
// Update data user
router.put("/:id", UserController.updateUser);
// Update data user
router.put("/", UserController.updateUserByToken);
// Delete data user
router.delete("/:id", UserController.deleteUser);

module.exports = router;
