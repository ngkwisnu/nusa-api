const ulasanModel = require('../models/UlasanModel')

const getAllUlasan = async(req, res) => {
    try {
        const [ data ] = await ulasanModel.getAllUlasan()
        res.json({
            message: 'GET all ulasan success!',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        })
    }
}

const getUlasanById = async(req, res) => {
    const id = req.params.id

    try {
        const ulasan = await ulasanModel.getUlasanById(id)

        if (ulasan.length > 0) {
            res.json({
                message: `Data ulasan Dengan ID:${id} Berhasil Diambil!`,
                data: ulasan,
            });
        } else {
            res.status(404).json({
                message: `Data ulasan Dengan ID:${id} tidak ditemukan, tolong masukkan data dengan benar!`,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server error!',
            serverMessage: error.message || 'Internal server error.',
        })
    }
}

const addUlasan = async (req, res) => {
    let { body } = req;
    let file = req.files['file'] ? req.files['file'][0].filename : null
    const requiredFields = ['rating', 'ulasan', 'keunggulan', 'id_user', 'id_wisata'];

    const allFieldsPresent = requiredFields.every(field => Object.prototype.hasOwnProperty.call(body, field));
    if (!allFieldsPresent) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.'
        });
    }
    try {
        const dataAlreadyExists = await ulasanModel.getUlasanByIdUser(body.id_user);
        if (dataAlreadyExists.length > 0) {
            return res.status(400).json({
                message: `User hanya bisa memberikan ulasan sekali, User dengan ID: ${body.id_user} sudah memberikan ulasan!`
            });
        }
        fileUrl = `http://localhost:5000/api/files/${file}`
        await ulasanModel.addUlasan(body, fileUrl);
        res.status(201).json({
            message: 'Tambah data ulasan berhasil!',
            data: body
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        });
    }
}

const updateUlasan = async (req, res) => {
    const { id } = req.params;
    let { body } = req;
    let file = req.files['file'] ? req.files['file'][0].filename : null
    const requiredFields = ['rating', 'ulasan', 'keunggulan', 'id_user', 'id_wisata', 'created_at', 'updated_at'];

    const allFieldsPresent = requiredFields.every(field => Object.prototype.hasOwnProperty.call(body, field));
    if (!allFieldsPresent) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.'
        });
    }

    try {
        // Cek apakah data dengan kode booking yang sama sudah ada
        const dataAlreadyExists = await ulasanModel.getUlasanByIdUser(body.id_user);
        if (dataAlreadyExists.length > 1) {
            return res.status(400).json({
                message: `User dengan ID: ${body.id_user} sudah memberikan ulasan!`
            });
        }

        // Lakukan pembaruan data
        const fileUrl = `http://18.141.9.175:5000/api/files/${file}`;
        await ulasanModel.updateUlasan(body, fileUrl, id);

        // Kirim respons berhasil
        res.status(201).json({
            message: `UPDATE ulasan dengan ID:${id} berhasil!`,
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

const deleteUlasan = async(req, res) => {
    const { id } = req.params
    try {
        const dataAlreadyExists = await ulasanModel.getUlasanById(id)
        if(dataAlreadyExists.length == 0){
            return res.status(400).json({
                message: `Deleted failed! ulasan dengan ID:${id} tidak ditemukan!`
            })
        } 
        await ulasanModel.deleteUlasan(id)
        res.json({
            message : `Deleted ulasan dengan ID:${id} sukses!`,
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
    getAllUlasan,
    getUlasanById,
    addUlasan,
    updateUlasan,
    deleteUlasan
}