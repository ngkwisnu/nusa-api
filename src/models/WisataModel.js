const dbPool = require('../config/database')

const getAllWisata = () => {
    try {
        const SQLQuery = 'SELECT * FROM wisata'
        return dbPool.execute(SQLQuery)
    } catch (error) {
        console.log(error);
    }
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

const addWisata = (body, gambar1Url, gambar2Url, gambar3Url, gambar4Url) => {
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
    const { nama, lokasi, jam_buka, jam_tutup, jarak_lokasi, harga, deskripsi, informasi_tourguide, harga_termasuk, kategori } = body;
    // console.log(body);
    const SQLQuery = `
        INSERT INTO wisata (nama, lokasi, jam_buka, jam_tutup, jarak_lokasi, harga, deskripsi, gambar1, gambar2, gambar3, gambar4, informasi_tourguide, harga_termasuk, kategori, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ nama, lokasi, jam_buka, jam_tutup, jarak_lokasi, harga, deskripsi, gambar1Url, gambar2Url, gambar3Url, gambar4Url, informasi_tourguide, harga_termasuk, kategori, created_at, updated_at ];
    return dbPool.execute(SQLQuery, values);
}

const updateWisata = (body, gambar1Url, gambar2Url, gambar3Url, gambar4Url, id) => {
    try {
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
    const { nama, lokasi, jam_buka, jam_tutup, jarak_lokasi, harga, deskripsi, informasi_tourguide, harga_termasuk, kategori } = body;
    const SQLQuery = `
        UPDATE wisata 
        SET nama = ?, lokasi = ?, jarak_lokasi = ?, harga = ?, deskripsi = ?, gambar1 = ?, gambar2 = ?, gambar3 = ?, gambar4 = ?, informasi_tourguide = ?, harga_termasuk = ?, kategori = ?, created_at = ?, updated_at = ? 
        WHERE id = ?
    `;
    const values =  [ nama, lokasi, jarak_lokasi, harga, deskripsi, gambar1Url, gambar2Url, gambar3Url, gambar4Url, informasi_tourguide, harga_termasuk, kategori, created_at, updated_at, id ];
    return dbPool.execute(SQLQuery, values);
    } catch (error) {
        console.log(error);
    }
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