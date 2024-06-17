const FavoriteModel = require("../models/FavoriteModel");

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
  const id_user = req.params.id;

  try {
    const favorite = await FavoriteModel.getFavoriteByIdUser(id_user);

    if (favorite.length > 0) {
      res.json({
        message: `Data favorite Dengan ID User:${id} Berhasil Diambil!`,
        data: favorite,
      });
    } else {
      res.status(404).json({
        message: `Data favorite Dengan ID User:${id} tidak ditemukan, tolong masukkan data dengan benar!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      serverMessage: error.message || "Internal server error.",
    });
  }
};

module.exports = {
  getAllFavorite,
  getFavoriteByIdUser,
};
