const dbPool = require('../config/database')

const getAllUlasan = () => {
    const SQLQuery = 'SELECT * FROM ulasan'
    return dbPool.execute(SQLQuery)
}

const getUlasanById = async(id) => {
    try {
        const result = await dbPool.query('SELECT * FROM ulasan WHERE id = ?', [id]);
        return result[0];
    } catch (error) {
        console.error('Error in getUlasanById:', error);
        throw error;
    }
}

const addUlasan = (body, fileUrl) => {
    const { rating, ulasan, keunggulan, id_user, id_wisata } = body;
    const currentTime = new Date();
  
    const year = currentTime.getFullYear();
    const month = ('0' + (currentTime.getMonth() + 1)).slice(-2); // Tambah 1 karena bulan dimulai dari 0
    const date = ('0' + currentTime.getDate()).slice(-2);
    const hours = ('0' + currentTime.getHours()).slice(-2);
    const minutes = ('0' + currentTime.getMinutes()).slice(-2);
    const seconds = ('0' + currentTime.getSeconds()).slice(-2);

    // Format waktu ke dalam string
    const created_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const updated_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const SQLQuery = `
        INSERT INTO ulasan (rating, ulasan, keunggulan, file, id_user, id_wisata, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ rating, ulasan, keunggulan, fileUrl, id_user, id_wisata, created_at, updated_at ];
    return dbPool.execute(SQLQuery, values);
}

const updateUlasan = (body, id, fileUrl) => {
    const { rating, ulasan, keunggulan, id_user, id_wisata, created_at } = body;
    const currentTime = new Date();
  
    const year = currentTime.getFullYear();
    const month = ('0' + (currentTime.getMonth() + 1)).slice(-2); // Tambah 1 karena bulan dimulai dari 0
    const date = ('0' + currentTime.getDate()).slice(-2);
    const hours = ('0' + currentTime.getHours()).slice(-2);
    const minutes = ('0' + currentTime.getMinutes()).slice(-2);
    const seconds = ('0' + currentTime.getSeconds()).slice(-2);

    // Format waktu ke dalam string
    // const created_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const updated_at = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    const SQLQuery = `
        UPDATE ulasan 
        SET rating = ?, ulasan = ?, keunggulan = ?, file = ?, id_user = ?, id_wisata = ?, created_at = ?, updated_at = ?
        WHERE id = ?
    `;
    const values =  [ rating, ulasan, keunggulan, fileUrl, id_user, id_wisata, created_at, updated_at, id ];
    return dbPool.execute(SQLQuery, values);
}


const getUlasanByIdUser = async(id_user) => {
    try {
        const [ hasil ] = await dbPool.query(`SELECT * FROM ulasan WHERE id_user = ?`, [id_user])
        return hasil
    } catch (error) {
        console.error('Error in getUlasanByIdUser ', error)
        throw error
    }
}

const deleteUlasan = async(id) => {
    try {
        await dbPool.query('DELETE FROM ulasan WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error in deleteUlasan:', error);
        throw error;
    }
}

module.exports = {
    deleteUlasan,
    getAllUlasan,
    addUlasan,
    getUlasanById,
    updateUlasan,
    getUlasanByIdUser
}