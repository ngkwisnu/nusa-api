const pesananModel = require('../models/PesananModel')

const getAllPesanan = async(req, res) => {
    try {
        const [ data ] = await pesananModel.getAllPesanan()
        res.json({
            message: 'GET all pesanan success!',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        })
    }
}

const getPesananById = async(req, res) => {
    const id = req.params.id

    try {
        const pesanan = await pesananModel.getPesananById(id)

        if (pesanan.length > 0) {
            res.json({
                message: `Data pesanan Dengan ID:${id} Berhasil Diambil!`,
                data: pesanan,
            });
        } else {
            res.status(404).json({
                message: `Data pesanan Dengan ID:${id} tidak ditemukan, tolong masukkan data dengan benar!`,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server error!',
            serverMessage: error.message || 'Internal server error.',
        })
    }
}

const addPesanan = async (req, res) => {
    let { body } = req;
    console.log(body);
    const requiredFields = ['total', 'tanggal_pemesanan', 'tanggal_bayar', 'tanggal_keberangkatan', 'jumlah_orang', 'kode_booking', 'status', 'metode_pembayaran', 'id_user', 'id_wisata'];

    if (!requiredFields.every(field => body.hasOwnProperty(field))) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.'
        });
    }
    try {
        const dataAlreadyExists = await pesananModel.getPesananByKode(body.kode_booking);
        if (dataAlreadyExists.length > 0) {
            return res.status(400).json({
                message: `Pesanan dengan Kode Booking: ${body.kode_booking} sudah ada, silahkan gunakan kode booking yang lain!`
            });
        }
        await pesananModel.addPesanan(body);
        res.status(201).json({
            message: 'Tambah data pesanan berhasil!',
            data: body
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        });
    }
}

const updatePesanan = async (req, res) => {
    const { id } = req.params;
    let { body } = req;
    console.log(body);
    const requiredFields = ['total', 'tanggal_pemesanan', 'tanggal_bayar', 'tanggal_keberangkatan', 'jumlah_orang', 'kode_booking', 'status', 'metode_pembayaran', 'id_user', 'id_wisata'];

    if (!requiredFields.every(field => body.hasOwnProperty(field))) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.'
        });
    }

    try {
        // Cek apakah data dengan kode booking yang sama sudah ada
        const dataAlreadyExists = await pesananModel.getPesananByKode(body.kode_booking);
        if (dataAlreadyExists.length > 1) {
            return res.status(400).json({
                message: `Pesanan dengan Kode Booking: ${body.kode_booking} sudah ada, silahkan gunakan kode booking yang lain!`
            });
        }

        // Lakukan pembaruan data
        await pesananModel.updatePesanan(body, id);

        // Kirim respons berhasil
        res.status(201).json({
            message: `UPDATE pesanan dengan ID:${id} berhasil!`,
            data: {
                id: id,
                ...body
            }
        });
    } catch (error) {
        // Tangani kesalahan server
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        });
    }
}

const deletePesanan = async(req, res) => {
    const { id } = req.params
    try {
        const dataAlreadyExists = await pesananModel.getPesananById(id)
        if(dataAlreadyExists.length == 0){
            return res.status(400).json({
                message: `Deleted failed! pesanan dengan ID:${id} tidak ditemukan!`
            })
        } 
        await pesananModel.deletePesanan(id)
        res.json({
            message : `Deleted pesanan dengan ID:${id} sukses!`,
            data : null
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        })
    }
}

module.exports = {
    getAllPesanan,
    getPesananById,
    addPesanan,
    updatePesanan,
    deletePesanan
}