const dbPool = require('../config/database')

const getAllPesanan = () => {
    const SQLQuery = 'SELECT * FROM pesanan'
    return dbPool.execute(SQLQuery)
}

const getPesananById = async(id) => {
    try {
        const result = await dbPool.query('SELECT * FROM pesanan WHERE id = ?', [id]);
        return result[0];
    } catch (error) {
        console.error('Error in getPesananById:', error);
        throw error;
    }
}

const addPesanan = (body, fileUrl) => {
    const { total, tanggal_pemesanan, tanggal_bayar, tanggal_keberangkatan, jumlah_orang, kode_booking, status, metode_pembayaran, id_user, id_wisata } = body;
    const SQLQuery = `
        INSERT INTO pesanan (total, tanggal_pemesanan, tanggal_bayar, tanggal_keberangkatan, jumlah_orang, kode_booking, file, status, metode_pembayaran, id_user, id_wisata) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ total, tanggal_pemesanan, tanggal_bayar, tanggal_keberangkatan, jumlah_orang, kode_booking, fileUrl, status, metode_pembayaran, id_user, id_wisata ];
    return dbPool.execute(SQLQuery, values);
}

const updatePesanan = (body, fileUrl, id) => {
    const { total, tanggal_pemesanan, tanggal_bayar, tanggal_keberangkatan, jumlah_orang, kode_booking, status, metode_pembayaran, id_user, id_wisata } = body;
    const SQLQuery = `
        UPDATE pesanan 
        SET total = ?, tanggal_pemesanan = ?, tanggal_bayar = ?, tanggal_keberangkatan = ?, jumlah_orang = ?, kode_booking = ?, status = ?, metode_pembayaran = ?, id_user = ?, id_wisata = ?, file = ?
        WHERE id = ?
    `;
    const values =  [ total, tanggal_pemesanan, tanggal_bayar, tanggal_keberangkatan, jumlah_orang, kode_booking, status, metode_pembayaran, id_user, id_wisata, fileUrl, id ];
    return dbPool.execute(SQLQuery, values);
}


const getPesananByKode = async(kode_booking) => {
    try {
        const [ hasil ] = await dbPool.query(`SELECT * FROM pesanan WHERE kode_booking = ?`, [kode_booking])
        return hasil
    } catch (error) {
        console.error('Error in getPesananByKode ', error)
        throw error
    }
}

const deletePesanan = async(id) => {
    try {
        await dbPool.query('DELETE FROM pesanan WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error in deletePesanan:', error);
        throw error;
    }
}

module.exports = {
    deletePesanan,
    getAllPesanan,
    addPesanan,
    getPesananById,
    updatePesanan,
    getPesananByKode
}