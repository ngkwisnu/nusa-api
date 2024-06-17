const dbPool = require("../config/database");

const getAllFavorite = () => {
  const SQLQuery = "SELECT * FROM favorite";
  return dbPool.execute(SQLQuery);
};

const getFavoriteByIdUser = async (id) => {
  try {
    const result = await dbPool.query(
      "SELECT * FROM favorite WHERE id_user = ?",
      [id]
    );
    return result[0];
  } catch (error) {
    console.error("Error in getFavoriteByIdUser:", error);
    throw error;
  }
};

const getFavoriteById = async (id) => {
  try {
    const result = await dbPool.query("SELECT * FROM favorite WHERE id = ?", [
      id,
    ]);
    return result[0];
  } catch (error) {
    console.error("Error in getFavoriteById:", error);
    throw error;
  }
};

const addFavorite = (body) => {
  const { id_user, id_wisata } = body;
  const SQLQuery = `
        INSERT INTO favorite (id_user, id_wisata)
        VALUES (?, ?)
    `;
  const values = [id_user, id_wisata];
  return dbPool.execute(SQLQuery, values);
};

const deleteFavorite = async (id) => {
  try {
    await dbPool.query("DELETE FROM favorite WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error in deleteFavorite:", error);
    throw error;
  }
};

module.exports = {
  getAllFavorite,
  getFavoriteByIdUser,
  addFavorite,
  deleteFavorite,
  getFavoriteById,
};
