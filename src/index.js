const http = require("http");
const PORT = 5000;
const HOST = "0.0.0.0";
// const HOST = "localhost";
const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.json());
const server = http.createServer(app);
// Impor dotenv
const dotenv = require("dotenv");
// Panggil method config() untuk memuat variabel lingkungan dari file .env
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const multer = require("multer");
const fs = require("fs");
const imagesDir = path.join(__dirname, "..", "files");

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}
app.use("/api/files", express.static(imagesDir));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});

const authentication = require("./middleware/validate.middleware");

const WisataRoute = require("./routes/WisataRoute");
const UserRoute = require("./routes/UserRoute");
const PusatBantuanRoute = require("./routes/PusatBantuanRoute");
const PesananRoute = require("./routes/PesananRoute");
const UlasanRoute = require("./routes/UlasanRoute");
const AuthRoute = require("./routes/AuthRoute");
const FavoriteRoute = require("./routes/FavoriteRoute");

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/favorite", (authentication, FavoriteRoute));
app.use(
  "/wisata",
  upload.fields([
    { name: "gambar1" },
    { name: "gambar2" },
    { name: "gambar3" },
    { name: "gambar4" },
  ]), // Middleware authentication
  authentication,
  WisataRoute // Middleware WisataRoute
);

app.use(
  "/user",
  upload.fields([{ name: "foto", maxCount: 10 }]),
  (authentication, UserRoute)
);
app.use("/pusat-bantuan", (authentication, PusatBantuanRoute));
app.use(
  "/pesanan",
  upload.fields([{ name: "file", maxCount: 10 }]),
  (authentication, PesananRoute)
);
app.use(
  "/ulasan",
  upload.fields([{ name: "file", maxCount: 10 }]),
  (authentication, UlasanRoute)
);
app.use("/auth", AuthRoute);

app.use(cookieParser());
const dbPool = require("./config/database");
const testConnection = async () => {
  try {
    await dbPool.getConnection();
    console.log("Koneksi Berhasil");
  } catch (error) {
    console.log("Koneksi gagal:" + error);
  }
};
server.listen(PORT, HOST, () => {
  testConnection();
  console.log(`Server is running in http://${HOST}:${PORT}`);
});
