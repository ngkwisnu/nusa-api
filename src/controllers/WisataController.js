const wisataModel = require("../models/WisataModel");

const getAllWisata = async (req, res) => {
  const kategori = req.query.kategori;
  const rating = req.query.rating;

  if (kategori) {
    try {
      const wisata = await wisataModel.getWisataByKategori(kategori);

      if (wisata.length > 0) {
        res.json({
          message: `Data wisata berdasarkan kategori: ${kategori} Berhasil Diambil!`,
          data: wisata,
        });
      } else {
        res.status(404).json({
          message: `Data wisata berdasarkan kategori: ${kategori} tidak ditemukan, tolong masukkan data dengan benar!`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Server error!",
        serverMessage: error.message || "Internal server error.",
      });
    }
  }

  if (rating) {
    try {
      const wisata = await wisataModel.getWisataByRating(rating);
      if (wisata.length > 0) {
        res.json({
          message: `Data wisata berdasarkan rating: ${rating} Berhasil Diambil!`,
          data: wisata,
        });
      } else {
        res.status(404).json({
          message: `Data wisata berdasarkan rating: ${rating} tidak ditemukan, tolong masukkan data dengan benar!`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Server error!",
        serverMessage: error.message || "Internal server error.",
      });
    }
  } else {
    try {
      const [result] = await wisataModel.getAllWisata();
      res.json({
        message: "GET all wisata success!",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error wkwk!",
        serverMessage: error,
      });
    }
  }
};

const getWisataById = async (req, res) => {
  const id = req.params.id;

  try {
    const wisata = await wisataModel.getWisataById(id);

    if (wisata.length > 0) {
      res.json({
        message: `Data wisata Dengan ID:${id} Berhasil Diambil!`,
        data: wisata,
      });
    } else {
      res.status(404).json({
        message: `Data wisata Dengan ID:${id} tidak ditemukan, tolong masukkan data dengan benar!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      serverMessage: error.message || "Internal server error.",
    });
  }
};

const getWisataByKategori = async (req, res) => {
  const kategori = req.query.kategori;

  try {
    const wisata = await wisataModel.getWisataByKategori(kategori);

    if (wisata.length > 0) {
      res.json({
        message: `Data wisata berdasarkan kategori: ${kategori} Berhasil Diambil!`,
        data: wisata,
      });
    } else {
      res.status(404).json({
        message: `Data wisata berdasarkan kategori: ${kategori} tidak ditemukan, tolong masukkan data dengan benar!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      serverMessage: error.message || "Internal server error.",
    });
  }
};

const addWisata = async (req, res) => {
  const { filter } = req.body;
  if (filter) {
    try {
      const wisata = await wisataModel.getWisataByRating(filter);
      if (wisata.length > 0) {
        res.json({
          message: `Data wisata berdasarkan rating: ${filter} Berhasil Diambil!`,
          data: wisata,
        });
      } else {
        res.status(404).json({
          message: `Data wisata berdasarkan rating: ${filter} tidak ditemukan, tolong masukkan data dengan benar!`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Server error!",
        serverMessage: error.message || "Internal server error.",
      });
    }
  }
  const { body } = req;
  const gambar1 = req.files["gambar1"]
    ? req.files["gambar1"][0].filename
    : null;
  const gambar2 = req.files["gambar2"]
    ? req.files["gambar2"][0].filename
    : null;
  const gambar3 = req.files["gambar3"]
    ? req.files["gambar3"][0].filename
    : null;
  const gambar4 = req.files["gambar4"]
    ? req.files["gambar4"][0].filename
    : null;
  const requiredFields = [
    "nama",
    "lokasi",
    "jam_buka",
    "jam_tutup",
    "jarak_lokasi",
    "harga",
    "deskripsi",
    "informasi_tourguide",
    "harga_termasuk",
    "kategori",
    "rating",
    "payment_link",
  ];
  const allFieldsPresent = requiredFields.every((field) =>
    Object.prototype.hasOwnProperty.call(body, field)
  );
  if (!allFieldsPresent) {
    return res.status(400).json({
      message: "Data yang dikirim tidak lengkap atau tidak sesuai format.",
    });
  }
  try {
    const dataAlreadyExists = await wisataModel.getWisataByName(body.nama);
    if (dataAlreadyExists.length > 0) {
      return res.status(400).json({
        message: `Wisata dengan Nama: ${body.nama} sudah ada, silahkan masukkan nama wisata yang lain!`,
      });
    }
    const gambar1Url = `http://18.141.9.175:5000/api/files/${gambar1}`;
    const gambar2Url = `http://18.141.9.175:5000/api/files/${gambar2}`;
    const gambar3Url = `http://18.141.9.175:5000/api/files/${gambar3}`;
    const gambar4Url = `http://18.141.9.175:5000/api/files/${gambar4}`;
    await wisataModel.addWisata(
      body,
      gambar1Url,
      gambar2Url,
      gambar3Url,
      gambar4Url
    );
    res.status(201).json({
      message: "Tambah data wisata berhasil!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      serverMessage: error,
    });
  }
};

const updateWisata = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const gambar1 = req.files["gambar1"]
    ? req.files["gambar1"][0].filename
    : null;
  const gambar2 = req.files["gambar2"]
    ? req.files["gambar2"][0].filename
    : null;
  const gambar3 = req.files["gambar3"]
    ? req.files["gambar3"][0].filename
    : null;
  const gambar4 = req.files["gambar4"]
    ? req.files["gambar4"][0].filename
    : null;

  const requiredFields = [
    "nama",
    "lokasi",
    "jam_buka",
    "jam_tutup",
    "jarak_lokasi",
    "harga",
    "deskripsi",
    "informasi_tourguide",
    "harga_termasuk",
    "kategori",
    "rating",
    "payment_link",
  ];
  const allFieldsPresent = requiredFields.every((field) =>
    Object.prototype.hasOwnProperty.call(body, field)
  );
  if (!allFieldsPresent) {
    return res.status(400).json({
      message: "Data yang dikirim tidak lengkap atau tidak sesuai format.",
    });
  }

  try {
    // Cek apakah data dengan nama yang sama sudah ada
    const dataAlreadyExists = await wisataModel.getWisataByName(body.nama);
    if (dataAlreadyExists.length > 1) {
      return res.status(400).json({
        message: `Wisata dengan Nama: ${body.nama} sudah ada, silahkan masukkan nama wisata yang lain!`,
      });
    }

    // Lakukan pembaruan data
    const gambar1Url = `http://18.141.9.175:5000/api/files/${gambar1}`;
    const gambar2Url = `http://18.141.9.175:5000/api/files/${gambar2}`;
    const gambar3Url = `http://18.141.9.175:5000/api/files/${gambar3}`;
    const gambar4Url = `http://18.141.9.175:5000/api/files/${gambar4}`;
    await wisataModel.updateWisata(
      body,
      gambar1Url,
      gambar2Url,
      gambar3Url,
      gambar4Url,
      id
    );

    // Kirim respons berhasil
    res.status(201).json({
      message: `UPDATE wisata dengan ID:${id} berhasil!`,
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    // Tangani kesalahan server
    res.status(500).json({
      message: "Server error!",
      serverMessage: error,
    });
  }
};

const deleteWisata = async (req, res) => {
  const { id } = req.params;
  try {
    const dataAlreadyExists = await wisataModel.getWisataById(id);
    if (dataAlreadyExists.length == 0) {
      return res.status(400).json({
        message: `Deleted failed! wisata dengan ID:${id} tidak ditemukan!`,
      });
    }
    await wisataModel.deleteWisata(id);
    res.json({
      message: `Deleted wisata dengan ID:${id} sukses!`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllWisata,
  getWisataById,
  addWisata,
  updateWisata,
  deleteWisata,
  getWisataByKategori,
};
