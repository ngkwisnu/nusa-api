const pusatBantuanModel = require('../models/PusatBantuanModel')

const getAllInformasi = async(req, res) => {
    try {
        const [ data ] = await pusatBantuanModel.getAllInformasi()
        res.json({
            message: 'GET all information success!',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        })
    }
}

const getInformasiById = async(req, res) => {
    const id = req.params.id

    try {
        const information = await pusatBantuanModel.getInformasiById(id)

        if (information.length > 0) {
            res.json({
                message: `Informasi layanan Dengan ID:${id} Berhasil Diambil!`,
                data: information,
            });
        } else {
            res.status(404).json({
                message: `Informasi layanan Dengan ID:${id} tidak ditemukan, tolong masukkan data dengan benar!`,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server error!',
            serverMessage: error.message || 'Internal server error.',
        })
    }
}

const addInformasi = async (req, res) => {
    const { body } = req;

    // Periksa apakah semua properti yang diperlukan ada dalam objek body
    if (!body.judul || !body.deskripsi) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.'
        });
    }

    try {
        // Cek apakah data dengan judul yang sama sudah ada
        const dataAlreadyExists = await pusatBantuanModel.getInformasiByJudul(body.judul);
        if (dataAlreadyExists.length > 1) {
            return res.status(400).json({
                message: `Informasi dengan Judul: ${body.judul} sudah ada, silahkan masukkan Judul yang lain!`
            });
        }

        // Tambahkan data informasi
        await pusatBantuanModel.addInformasi(body);

        // Kirim respons berhasil
        res.status(201).json({
            message: 'Tambah data Informasi berhasil!',
            data: body
        });
    } catch (error) {
        // Tangani kesalahan server
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        });
    }
}

const updateInformasi = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    // Periksa apakah semua properti yang diperlukan ada dalam objek body
    if (!body.judul || !body.deskripsi) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.',
            data: null
        });
    }

    try {
        // Cek apakah data dengan judul yang sama sudah ada
        const dataAlreadyExists = await pusatBantuanModel.getInformasiByJudul(body.judul);
        if (dataAlreadyExists.length > 0) {
            return res.status(400).json({
                message: `Informasi dengan Judul: ${body.judul} sudah ada, silahkan masukkan Judul yang lain!`
            });
        }

        // Lakukan pembaruan data informasi
        await pusatBantuanModel.updateInformasi(body, id);

        // Kirim respons berhasil
        res.status(201).json({
            message: `UPDATE informasi dengan ID:${id} berhasil!`,
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

const deleteInformasi = async(req, res) => {
    const { id } = req.params
    try {
        const dataAlreadyExists = await pusatBantuanModel.getInformasiById(id)
        if(dataAlreadyExists.length == 0){
            return res.status(400).json({
                message: `Deleted failed! Informasi dengan ID:${id} tidak ditemukan!`
            })
        } 
        await pusatBantuanModel.deleteInformasi(id)
        res.json({
            message : `Deleted Informasi dengan ID:${id} sukses!`,
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
    getAllInformasi,
    getInformasiById,
    addInformasi,
    updateInformasi,
    deleteInformasi
}