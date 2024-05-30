const dbPool = require('../config/database')

const getAllWisata = () => {
    const SQLQuery = 'SELECT * FROM wisata'
    return dbPool.execute(SQLQuery)
}

const getWisataById = async(id) => {
    try {
        const result = await dbPool.query('SELECT * FROM wisata WHERE id = ?', [id]);
        return result[0];
    } catch (error) {
        console.error('Error in getWisataById:', error);
        throw error;
    }
}

const addWisata = (body) => {
    const { nama, lokasi, jam_buka, jam_tutup, jarak_lokasi, harga, deskripsi, gambar1, gambar2, gambar3, gambar4, informasi_tourguide, harga_termasuk, kategori, created_at, updated_at } = body;
    console.log(body);
    const SQLQuery = `
        INSERT INTO wisata (nama, lokasi, jam_buka, jam_tutup, jarak_lokasi, harga, deskripsi, gambar1, gambar2, gambar3, gambar4, informasi_tourguide, harga_termasuk, kategori, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ nama, lokasi, jam_buka, jam_tutup, jarak_lokasi, harga, deskripsi, gambar1, gambar2, gambar3, gambar4, informasi_tourguide, harga_termasuk, kategori, created_at, updated_at ];
    return dbPool.execute(SQLQuery, values);
}

const updateWisata = (body, id) => {
    const { nama, lokasi, jarak_lokasi, harga, deskripsi, gambar1, gambar2, gambar3, gambar4, informasi_tourguide, harga_termasuk, kategori, created_at, updated_at } = body;
    const SQLQuery = `
        UPDATE wisata 
        SET nama = ?, lokasi = ?, jarak_lokasi = ?, harga = ?, deskripsi = ?, gambar1 = ?, gambar2 = ?, gambar3 = ?, gambar4 = ?, informasi_tourguide = ?, harga_termasuk = ?, kategori = ?, created_at = ?, updated_at = ? 
        WHERE id = ?
    `;
    const values =  [ nama, lokasi, jarak_lokasi, harga, deskripsi, gambar1, gambar2, gambar3, gambar4, informasi_tourguide, harga_termasuk, kategori, created_at, updated_at, id ];
    return dbPool.execute(SQLQuery, values);
}

const getWisataByName = async(nama) => {
    try {
        const [ hasil ] = await dbPool.query(`SELECT * FROM wisata WHERE nama = ?`, [nama])
        return hasil
    } catch (error) {
        console.error('Error in getWisataByName ', error)
        throw error
    }
}

const deleteWisata = async(id) => {
    try {
        await dbPool.query('DELETE FROM wisata WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error in deleteWisata:', error);
        throw error;
    }
}

module.exports = {
    getAllWisata,
    getWisataById,
    addWisata,
    getWisataByName,
    updateWisata,
    deleteWisata
}