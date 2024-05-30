const dbPool = require('../config/database')

const getAllInformasi = () => {
    const SQLQuery = 'SELECT * FROM pusat_bantuan'
    return dbPool.execute(SQLQuery)
}

const getInformasiById = async(id) => {
    try {
        const result = await dbPool.query('SELECT * FROM pusat_bantuan WHERE id = ?', [id]);
        return result[0];
    } catch (error) {
        console.error('Error in getInformasiById:', error);
        throw error;
    }
}

const addInformasi = (body) => {
    const { judul, deskripsi } = body;
    console.log(body);
    const SQLQuery = `
        INSERT INTO pusat_bantuan (judul, deskripsi) 
        VALUES (?, ?)
    `;
    const values = [ judul, deskripsi ];
    return dbPool.execute(SQLQuery, values);
}

const updateInformasi = (body, id) => {
    const { judul, deskripsi } = body;
    const SQLQuery = `
        UPDATE pusat_bantuan 
        SET judul = ?, deskripsi = ?
        WHERE id = ?
    `;
    const values = [ judul, deskripsi, id ];
    return dbPool.execute(SQLQuery, values);
}


const getInformasiByJudul = async(judul) => {
    try {
        const [ hasil ] = await dbPool.query(`SELECT * FROM pusat_bantuan WHERE judul = ?`, [judul])
        return hasil
    } catch (error) {
        console.error('Error in get getInformasiByJudul ', error)
        throw error
    }
}

const deleteInformasi = async(id) => {
    try {
        await dbPool.query('DELETE FROM pusat_bantuan WHERE id = ?', [id]);
    } catch (error) {
        console.error('Error in delete deleteInformasi:', error);
        throw error;
    }
}

module.exports = {
    getAllInformasi,
    getInformasiById,
    addInformasi,
    getInformasiByJudul,
    updateInformasi,
    deleteInformasi
}