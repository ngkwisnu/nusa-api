const express = require("express");
const FavoriteController = require("../controllers/FavoriteController");

const router = express.Router();

// Menampilkan semua data pesanan
router.get("/", FavoriteController.getAllFavorite);
// Menampilkan pesanan sesuai dengan id
router.get("/:id_user", FavoriteController.getFavoriteByIdUser);
// Menambahkan data pesanan
router.post("/", FavoriteController.addFavorite);
// Delete data pesanan
router.delete("/:id", FavoriteController.deleteFavorite);

module.exports = router;
