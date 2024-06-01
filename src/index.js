const http = require('http');
const PORT = 3000;
const HOST = '0.0.0.0';
const express = require('express');
const app = express();
app.use(express.json());
const server = http.createServer(app);
// Impor dotenv
const dotenv = require('dotenv');
// Panggil method config() untuk memuat variabel lingkungan dari file .env
dotenv.config();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = {
    origin:true,
    credentials:true
}
const WisataRoute = require('./routes/WisataRoute');
const UserRoute = require('./routes/UserRoute');
const PusatBantuanRoute = require('./routes/PusatBantuanRoute');
const PesananRoute = require('./routes/PesananRoute');
const UlasanRoute = require('./routes/UlasanRoute');
const AuthRoute = require('./routes/AuthRoute');

app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/wisata', WisataRoute);
app.use('/user', UserRoute);
app.use('/pusat-bantuan', PusatBantuanRoute);
app.use('/pesanan', PesananRoute);
app.use('/ulasan', UlasanRoute);
app.use('/auth', AuthRoute);

app.use(cookieParser());
const dbPool = require('./config/database')
const testConnection = async () => {
    try {
        await dbPool.getConnection()
        console.log('Koneksi Berhasil');
    } catch (error) {
        console.log(error);
    }
}
server.listen(PORT, HOST, () => {
    testConnection()
    console.log(`Server is running in http://localhost:${PORT}`);
});
