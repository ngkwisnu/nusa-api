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

const addUlasan = (body) => {
    const { rating, ulasan, keunggulan, file, id_user, id_wisata, created_at, updated_at } = body;
    console.log(body);
    const SQLQuery = `
        INSERT INTO ulasan (rating, ulasan, keunggulan, file, id_user, id_wisata, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ rating, ulasan, keunggulan, file, id_user, id_wisata, created_at, updated_at ];
    return dbPool.execute(SQLQuery, values);
}

const updateUlasan = (body, id) => {
    const { rating, ulasan, keunggulan, file, id_user, id_wisata, created_at, updated_at } = body;
    const SQLQuery = `
        UPDATE ulasan 
        SET rating = ?, ulasan = ?, keunggulan = ?, file = ?, id_user = ?, id_wisata = ?, created_at = ?, updated_at = ?
        WHERE id = ?
    `;
    const values =  [ rating, ulasan, keunggulan, file, id_user, id_wisata, created_at, updated_at, id ];
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