const express = require("express");
const WisataController = require("../controllers/WisataController");
const authentication = require("../middleware/validate.middleware");
const router = express.Router();

// Menampilkan semua data wisata
router.get("/", WisataController.getAllWisata);
// Menampilkan wisata sesuai dengan id
router.get("/:id", WisataController.getWisataById);
// Menambahkan data wisata
router.post("/", WisataController.addWisata);
// Update data wisata
router.put("/:id", WisataController.updateWisata);
// Delete data wisata
router.delete("/:id", WisataController.deleteWisata);

module.exports = router;
