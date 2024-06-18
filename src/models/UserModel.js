const dbPool = require("../config/database");
const bcrypt = require("bcryptjs");

const getAllUser = () => {
  const SQLQuery = "SELECT * FROM user";
  return dbPool.execute(SQLQuery);
};

const getUserById = async (id) => {
  try {
    const result = await dbPool.query("SELECT * FROM user WHERE id = ?", [id]);
    return result[0];
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};

const registerUser = (body) => {
  const currentTime = new Date();

  const year = currentTime.getFullYear();
  const month = ("0" + (currentTime.getMonth() + 1)).slice(-2); // Tambah 1 karena bulan dimulai dari 0
  const date = ("0" + currentTime.getDate()).slice(-2);
  const hours = ("0" + currentTime.getHours()).slice(-2);
  const minutes = ("0" + currentTime.getMinutes()).slice(-2);
  const seconds = ("0" + currentTime.getSeconds()).slice(-2);

  // Format waktu ke dalam string
  const created_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const updated_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const { email, username, password, role } = body;
  console.log(body);
  const SQLQuery = `
        INSERT INTO user (email, username, password, role, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  const values = [email, username, password, role, created_at, updated_at];
  return dbPool.execute(SQLQuery, values);
};

const addUser = (body, fotoUrl) => {
  const { email, username, password, role, nama, telepon, alamat } = body;
  const currentTime = new Date();

  const year = currentTime.getFullYear();
  const month = ("0" + (currentTime.getMonth() + 1)).slice(-2); // Tambah 1 karena bulan dimulai dari 0
  const date = ("0" + currentTime.getDate()).slice(-2);
  const hours = ("0" + currentTime.getHours()).slice(-2);
  const minutes = ("0" + currentTime.getMinutes()).slice(-2);
  const seconds = ("0" + currentTime.getSeconds()).slice(-2);

  // Format waktu ke dalam string
  const created_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const updated_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const SQLQuery = `
        INSERT INTO user (email, username, password, role, created_at, updated_at, nama, telepon, alamat, foto) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    email,
    username,
    password,
    role,
    created_at,
    updated_at,
    nama,
    telepon,
    alamat,
    fotoUrl,
  ];
  return dbPool.execute(SQLQuery, values);
};

const updateUser = (body, fotoUrl, id) => {
  const { email, username, password, role, nama, telepon, alamat } = body;
  const currentTime = new Date();

  const year = currentTime.getFullYear();
  const month = ("0" + (currentTime.getMonth() + 1)).slice(-2); // Tambah 1 karena bulan dimulai dari 0
  const date = ("0" + currentTime.getDate()).slice(-2);
  const hours = ("0" + currentTime.getHours()).slice(-2);
  const minutes = ("0" + currentTime.getMinutes()).slice(-2);
  const seconds = ("0" + currentTime.getSeconds()).slice(-2);

  // Format waktu ke dalam string
  const created_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const updated_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  const SQLQuery = `
        UPDATE user 
        SET email = ?, username = ?, password = ?, role = ?, created_at = ?, updated_at = ?, nama = ?, telepon = ?, alamat = ?, foto = ?
        WHERE id = ?
    `;
  const values = [
    email,
    username,
    password,
    role,
    created_at,
    updated_at,
    nama,
    telepon,
    alamat,
    fotoUrl,
    id,
  ];
  return dbPool.execute(SQLQuery, values);
};

const updateUserByToken = async (body, fotoUrl, token) => {
  try {
    let { email, username, password, role, nama, telepon, alamat } = body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    role = "user";
    password = hash;
    const currentTime = new Date();

    const year = currentTime.getFullYear();
    const month = ("0" + (currentTime.getMonth() + 1)).slice(-2); // Tambah 1 karena bulan dimulai dari 0
    const date = ("0" + currentTime.getDate()).slice(-2);
    const hours = ("0" + currentTime.getHours()).slice(-2);
    const minutes = ("0" + currentTime.getMinutes()).slice(-2);
    const seconds = ("0" + currentTime.getSeconds()).slice(-2);

    // Format waktu ke dalam string
    const created_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const updated_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const SQLQuery = `
        UPDATE user 
        SET email = ?, username = ?, password = ?, role = ?, created_at = ?, updated_at = ?, nama = ?, telepon = ?, alamat = ?, foto = ?
        WHERE token = ?
    `;
    const values = [
      email,
      username,
      password,
      role,
      created_at,
      updated_at,
      nama,
      telepon,
      alamat,
      fotoUrl,
      token,
    ];
    return dbPool.execute(SQLQuery, values);
  } catch (error) {
    console.log(error);
  }
};

const updateAccessToken = (token, id) => {
  const SQLQuery = `
        UPDATE user 
        SET token = ? WHERE id = ?
    `;
  const values = [token, id];
  return dbPool.execute(SQLQuery, values);
};

const changePassword = (id, password) => {
  try {
    const SQLQuery = `
        UPDATE user 
        SET password = ? WHERE id = ?
    `;
    const values = [password, id];
    return dbPool.execute(SQLQuery, values);
  } catch (error) {
    console.error("Error in changePassword ", error);
    throw error;
  }
};

const getUserByName = async (nama) => {
  try {
    const [hasil] = await dbPool.query(`SELECT * FROM user WHERE nama = ?`, [
      nama,
    ]);
    return hasil;
  } catch (error) {
    console.error("Error in getUserByName ", error);
    throw error;
  }
};

const getUserByToken = async (token) => {
  try {
    const [hasil] = await dbPool.query(`SELECT * FROM user WHERE token = ?`, [
      token,
    ]);
    return hasil;
  } catch (error) {
    console.error("Error in getUserByToken ", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [hasil] = await dbPool.query(`SELECT * FROM user WHERE email = ?`, [
      email,
    ]);
    return hasil;
  } catch (error) {
    console.error("Error in getUserByEmail ", error);
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const [hasil] = await dbPool.query(
      `SELECT * FROM user WHERE username = ?`,
      [username]
    );
    return hasil;
  } catch (error) {
    console.error("Error in getUserByUsername ", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await dbPool.query("DELETE FROM user WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
};

module.exports = {
  getAllUser,
  getUserById,
  addUser,
  getUserByName,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByUsername,
  registerUser,
  changePassword,
  updateAccessToken,
  getUserByToken,
  updateUserByToken,
};
