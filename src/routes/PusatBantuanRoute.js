const express = require('express')
const PusatBantuanController = require('../controllers/PusatBantuanController')

const router = express.Router()

// Menampilkan semua data informasi
router.get('/', PusatBantuanController.getAllInformasi)
// Menampilkan informasi sesuai dengan id
router.get('/:id', PusatBantuanController.getInformasiById)
// Menambahkan data informasi
router.post('/', PusatBantuanController.addInformasi)
// Update data informasi
router.put('/:id', PusatBantuanController.updateInformasi)
// Delete data informasi
router.delete('/:id', PusatBantuanController.deleteInformasi)

module.exports = router