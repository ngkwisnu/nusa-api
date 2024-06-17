const FavoriteModel = require("../models/FavoriteModel");
const WisataModel = require("../models/WisataModel");
const UserModel = require("../models/UserModel");

const getAllFavorite = async (req, res) => {
  try {
    const [data] = await FavoriteModel.getAllFavorite();
    res.json({
      message: "GET all favorite success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      serverMessage: error,
    });
  }
};

const getFavoriteByIdUser = async (req, res) => {
  const id_user = req.params.id_user;

  try {
    const data = await FavoriteModel.getFavoriteByIdUser(id_user);
    const [favorite] = await FavoriteModel.getFavoriteByIdUser(id_user);
    const [user] = await UserModel.getUserById(favorite.id_user);
    const wisata = [];
    for (let index = 0; index < data.length; index++) {
      let [w] = await WisataModel.getWisataById(data[index].id_wisata);
      wisata.push(w);
    }
    if (data.length > 0) {
      res.json({
        message: `Data favorite Dengan ID User:${id_user} Berhasil Diambil!`,
        user: user,
        data: wisata,
      });
    } else {
      res.status(404).json({
        message: `Data favorite Dengan ID User:${id_user} tidak ditemukan, tolong masukkan data dengan benar!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      serverMessage: error.message || "Internal server error.",
    });
  }
};

const addFavorite = async (req, res) => {
  let { body } = req;
  const requiredFields = ["id_user", "id_wisata"];

  const allFieldsPresent = requiredFields.every((field) =>
    Object.prototype.hasOwnProperty.call(body, field)
  );
  if (!allFieldsPresent) {
    return res.status(400).json({
      message: "Data yang dikirim tidak lengkap atau tidak sesuai format.",
    });
  }
  try {
    await FavoriteModel.addFavorite(body);
    res.status(201).json({
      message: "Wisata telah ditambahkan ke favorite!",
      data: { body },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      serverMessage: error,
    });
  }
};

const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const dataAlreadyExists = await FavoriteModel.getFavoriteById(id);
    if (dataAlreadyExists.length == 0) {
      return res.status(400).json({
        message: `Deleted failed! favorite dengan ID:${id} tidak ditemukan!`,
      });
    }
    await FavoriteModel.deleteFavorite(id);
    res.json({
      message: `Deleted favorite dengan ID:${id} sukses!`,
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
  getAllFavorite,
  getFavoriteByIdUser,
  addFavorite,
  deleteFavorite,
};
