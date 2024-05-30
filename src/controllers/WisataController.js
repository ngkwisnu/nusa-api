const wisataModel = require('../models/WisataModel')

const getAllWisata = async(req, res) => {
    try {
        const [ data ] = await wisataModel.getAllWisata()
        res.json({
            message: 'GET all wisata success!',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        })
    }
}

const getWisataById = async(req, res) => {
    const id = req.params.id

    try {
        const wisata = await wisataModel.getWisataById(id)

        if (wisata.length > 0) {
            res.json({
                message: `Data wisata Dengan ID:${id} Berhasil Diambil!`,
                data: wisata,
            });
        } else {
            res.status(404).json({
                message: `Data wisata Dengan ID:${id} tidak ditemukan, tolong masukkan data dengan benar!`,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server error!',
            serverMessage: error.message || 'Internal server error.',
        })
    }
}

const addWisata = async(req, res) => {
    const { body } = req;
    console.log(body);
    // Periksa apakah semua properti yang diperlukan ada dalam objek body
    if (!body.nama || !body.lokasi || !body.jarak_lokasi || !body.harga || !body.deskripsi || !body.gambar1 || !body.gambar2 || !body.gambar3 || !body.gambar4 || !body.informasi_tourguide || !body.harga_termasuk || !body.kategori || !body.created_at || !body.updated_at) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.'
        });
    }
    try {
        const dataAlreadyExists = await wisataModel.getWisataByName(body.nama)
        if(dataAlreadyExists.length > 0){
            return res.status(400).json({
                message: `Wisata dengan Nama: ${body.nama} sudah ada, silahkan masukkan nama wisata yang lain!`
            })
        }
        await wisataModel.addWisata(body)
        res.status(201).json({
            message : 'Tambah data wisata berhasil!',
            data : body
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        })
    }
}

const updateWisata = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log(body);
    // Periksa apakah semua properti yang diperlukan ada dalam objek body
    if (!body.nama || !body.lokasi || !body.jarak_lokasi || !body.harga || !body.deskripsi || !body.gambar1 || !body.gambar2 || !body.gambar3 || !body.gambar4 || !body.informasi_tourguide || !body.harga_termasuk || !body.kategori || !body.created_at || !body.updated_at) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.',
            data: null
        });
    }

    try {
        // Cek apakah data dengan nama yang sama sudah ada
        const dataAlreadyExists = await wisataModel.getWisataByName(body.nama);
        if (dataAlreadyExists.length > 1) {
            return res.status(400).json({
                message: `Wisata dengan Nama: ${body.nama} sudah ada, silahkan masukkan nama wisata yang lain!`
            });
        }

        // Lakukan pembaruan data
        await wisataModel.updateWisata(body, id);

        // Kirim respons berhasil
        res.status(201).json({
            message: `UPDATE wisata dengan ID:${id} berhasil!`,
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

const deleteWisata = async(req, res) => {
    const { id } = req.params
    try {
        const dataAlreadyExists = await wisataModel.getWisataById(id)
        if(dataAlreadyExists.length == 0){
            return res.status(400).json({
                message: `Deleted failed! wisata dengan ID:${id} tidak ditemukan!`
            })
        } 
        await wisataModel.deleteWisata(id)
        res.json({
            message : `Deleted wisata dengan ID:${id} sukses!`,
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
    getAllWisata,
    getWisataById,
    addWisata,
    updateWisata,
    deleteWisata
}