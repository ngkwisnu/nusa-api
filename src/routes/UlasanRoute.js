const express = require('express')
const UlasanController = require('../controllers/UlasanController')

const router = express.Router()

// Menampilkan semua data ulasan
router.get('/', UlasanController.getAllUlasan)
// Menampilkan ulasan sesuai dengan id
router.get('/:id', UlasanController.getUlasanById)
// Menambahkan data ulasan
router.post('/', UlasanController.addUlasan)
// Update data ulasan
router.put('/:id', UlasanController.updateUlasan)
// Delete data ulasan
router.delete('/:id', UlasanController.deleteUlasan)

module.exports = router