const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { addToBlacklist } = require("../middleware/tokenBlacklist");

const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const { body } = req;
  body.role = "user";
  body.password = hash;
  // Periksa apakah semua properti yang diperlukan ada dalam objek body
  if (!body.email || !body.username || !body.password || !body.role) {
    return res.status(400).json({
      message: "Data yang dikirim tidak lengkap atau tidak sesuai format.",
    });
  }

  try {
    // Cek apakah data dengan nama yang sama sudah ada
    const emailAlreadyExists = await userModel.getUserByEmail(body.email);
    const usernameAlreadyExists = await userModel.getUserByUsername(
      body.username
    );
    const dataAlreadyExists = emailAlreadyExists || usernameAlreadyExists;
    if (dataAlreadyExists.length > 0) {
      return res.status(400).json({
        message: `Email: ${body.email} atau Username: ${body.username} sudah terdaftar, silahkan gunakan yang lain!`,
      });
    }

    // Tambahkan data user
    await userModel.registerUser(body);

    // Kirim respons berhasil
    res.status(201).json({
      message: "Register berhasil!",
      data: body,
    });
  } catch (error) {
    // Tangani kesalahan server
    res.status(500).json({
      message: "Server error!",
      serverMessage: error,
    });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    let [user] = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //if user exist then check the password or compare the password
    const checkCorrectPassword = await bcrypt.compare(password, user.password);

    //if password is wrong
    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const userData = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    //create jwt token
    jwt.sign(userData, "gahg48589a45ajfjAUFAHHFIhufuu", async (err, token) => {
      if (err) throw err;
      const bearerToken = `Bearer ${token}`;
      await userModel.updateAccessToken(bearerToken, user.id);
      return res.status(200).json({
        status: true,
        message: "Login Successfully",
        Authorization: bearerToken,
        data: user,
      });
    });

    // set token in the browser cookies and send the response to the client
    // res
    //   .cookie("accessToken", token, {
    //     httpOnly: true,
    //     expires: token.expiresIn,
    //   })
    //   .status(200)
    //   .json({
    //     message: "Login Success!",
    //     token,
    //     data: { ...rest },
    //     role,
    //   });
  } catch (err) {
    console.error(err); // log the error
    res.status(500).json({ success: false, message: "Failed to log in" });
  }
};

const logout = (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  addToBlacklist(token);
  res.status(200).json({ success: true, message: "Logout successful" });
};

const verify = async (req, res) => {
  try {
    const otpStore = {};
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smpt.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "nusaguide@gmail.com",
        pass: "oobefwsyrlngsweq",
      },
    });
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    const [dataUser] = await userModel.getUserByEmail(email);
    if (dataUser.length > 0) {
      return res.status(400).json({
        message: `Email: ${body.nama} tidak terdaftar, silahkan masukkan email yang benar!`,
      });
    }
    // Generate OTP
    const otp = crypto.randomInt(1000, 9999).toString();
    const link = `http://18.141.9.175:5000/auth/change-password/${dataUser.id}`;

    // Simpan OTP ke dalam penyimpanan sementara
    otpStore[email] = otp;

    // Kirim OTP ke email
    const mailOptions = {
      from: "nusaguide@gmail.com",
      to: email,
      subject: "Your OTP Code",
      html: `<p>Silahkan Masukkan Kode OTP Berikut:</p><h1>${otp}</h1><p>Silahkan melakukan perubahan password melalui link berikut: ${link}</p>`,
    };

    const data = {
      otp: otp,
      link: link,
    };

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.status(200).json({
          status: true,
          message: "Kode OTP telah dikirim ke email anda!",
          data: data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const changePassView = (req, res) => {
  const { id } = req.params;
  const message = null;
  res.render("change-pass", { id, message });
};

const savePassword = async (req, res) => {
  let { id, password, konfirmasi } = req.body;
  if (password !== konfirmasi) {
    const message = "Passoword tidak sama!";
    res.render("change-pass", { id, message });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  password = hash;
  try {
    // Cek apakah data dengan nama yang sama sudah ada
    await userModel.changePassword(id, password);
    console.log(req.body);
    // Kirim respons berhasil
    res.render("success", { password });
  } catch (error) {
    // Tangani kesalahan server
    res.status(500).json({
      message: "Server error!",
      serverMessage: error,
    });
  }
};

const accountSecure = async (req, res) => {
  let { latest_password, new_password, confirm } = req.body;
  const { id } = req.params;
  console.log(req.body);
  const [result] = await userModel.getUserById(id);
  if (!result == {}) {
    res.status(404).json({
      status: false,
      message: "Akun tidak terdaftar",
    });
  }
  const checkCorrectPassword = await bcrypt.compare(
    latest_password,
    result.password
  );

  //if password is wrong
  if (!checkCorrectPassword) {
    return res.status(401).json({
      success: false,
      message: "Password tidak sesuai!",
    });
  }

  if (new_password !== confirm) {
    return res.status(401).json({
      success: false,
      message: "Konfirmasi Password tidak tepat!",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(new_password, salt);
  new_password = hash;
  try {
    // Cek apakah data dengan nama yang sama sudah ada
    await userModel.changePassword(id, new_password);
    console.log(req.body);
    res.status(201).json({
      status: true,
      message: "Password berhasil diubah!",
    });
  } catch (error) {
    // Tangani kesalahan server
    res.status(500).json({
      message: "Server error!",
      serverMessage: error,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  verify,
  changePassView,
  savePassword,
  accountSecure,
};
