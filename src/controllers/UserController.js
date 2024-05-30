const userModel = require('../models/UserModel')

const getAllUser = async(req, res) => {
    try {
        const [ data ] = await userModel.getAllUser()
        res.json({
            message: 'GET all user success!',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        })
    }
}

const getUserById = async(req, res) => {
    const id = req.params.id

    try {
        const user = await userModel.getUserById(id)

        if (user.length > 0) {
            res.json({
                message: `Data user Dengan ID:${id} Berhasil Diambil!`,
                data: user,
            });
        } else {
            res.status(404).json({
                message: `Data user Dengan ID:${id} tidak ditemukan, tolong masukkan data dengan benar!`,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server error!',
            serverMessage: error.message || 'Internal server error.',
        })
    }
}

const addUser = async (req, res) => {
    const { body } = req;

    // Periksa apakah semua properti yang diperlukan ada dalam objek body
    if (!body.email ||!body.username ||!body.password ||!body.role || !body.nama || !body.telepon || !body.alamat || !body.foto) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.'
        });
    }

    try {
        // Cek apakah data dengan nama yang sama sudah ada
        const dataAlreadyExists = await userModel.getUserByName(body.nama);
        if (dataAlreadyExists.length > 0) {
            return res.status(400).json({
                message: `User dengan Nama: ${body.nama} sudah ada, silahkan masukkan nama User yang lain!`
            });
        }

        // Tambahkan data user
        await userModel.addUser(body);

        // Kirim respons berhasil
        res.status(201).json({
            message: 'Tambah data User berhasil!',
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

const updateUser = async (req, res) => {
    const { id } = req.params;
    let { body } = req;
    console.log(body);

    // Periksa apakah semua properti yang diperlukan ada dalam objek body
    if (!body.email ||!body.username ||!body.password ||!body.role || !body.nama || !body.telepon || !body.alamat || !body.foto) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.',
            data: null
        });
    }

    try {
        // Cek apakah data dengan nama yang sama sudah ada
        const dataAlreadyExists = await userModel.getUserByName(body.nama);
        if (dataAlreadyExists.length > 1) {
            return res.status(400).json({
                message: `User dengan Nama: ${body.nama} sudah ada, silahkan masukkan nama user yang lain!`
            });
        }

        // Lakukan pembaruan data user
        await userModel.updateUser(body, id);

        // Kirim respons berhasil
        res.status(201).json({
            message: `UPDATE user dengan ID:${id} berhasil!`,
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

const deleteUser = async(req, res) => {
    const { id } = req.params
    try {
        const dataAlreadyExists = await userModel.getUserById(id)
        if(dataAlreadyExists.length == 0){
            return res.status(400).json({
                message: `Deleted failed! User dengan ID:${id} tidak ditemukan!`
            })
        } 
        await userModel.deleteUser(id)
        res.json({
            message : `Deleted User dengan ID:${id} sukses!`,
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
    getAllUser,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}