const express = require('express')
const PesananController = require('../controllers/PesananController')

const router = express.Router()

// Menampilkan semua data pesanan
router.get('/', PesananController.getAllPesanan)
// Menampilkan pesanan sesuai dengan id
router.get('/:id', PesananController.getPesananById)
// Menambahkan data pesanan
router.post('/', PesananController.addPesanan)
// Update data pesanan
router.put('/:id', PesananController.updatePesanan)
// Delete data pesanan
router.delete('/:id', PesananController.deletePesanan)

module.exports = router