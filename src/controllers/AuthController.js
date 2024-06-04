const userModel = require('../models/UserModel')
const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken") 

const register = async (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const { body } = req;
    body.role = 'user'
    body.password = hash
    // Periksa apakah semua properti yang diperlukan ada dalam objek body
    if (!body.email ||!body.username ||!body.password ||!body.role) {
        return res.status(400).json({
            message: 'Data yang dikirim tidak lengkap atau tidak sesuai format.'
        });
    }

    try {
        // Cek apakah data dengan nama yang sama sudah ada
        const emailAlreadyExists = await userModel.getUserByEmail(body.email);
        const usernameAlreadyExists = await userModel.getUserByUsername(body.username);
        const dataAlreadyExists = emailAlreadyExists || usernameAlreadyExists;
        if (dataAlreadyExists.length > 0) {
            return res.status(400).json({
                message: `Email: ${body.email} atau Username: ${body.username} sudah terdaftar, silahkan gunakan yang lain!`
            });
        }

        // Tambahkan data user
        await userModel.registerUser(body);

        // Kirim respons berhasil
        res.status(201).json({
            message: 'Register berhasil!',
            data: body
        });
    } catch (error) {
        // Tangani kesalahan server
        res.status(500).json({
            message: "Server error!",
            serverMessage: error
        });
    }
}

const login = async (req, res) => {

    const username = req.body.username
    const password = req.body.password

    try{
        let [user] = await userModel.getUserByUsername(username)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //if user exist then check the password or compare the password
        const checkCorrectPassword = await bcrypt.compare(
            password, 
            user.password
        )

        //if password is wrong
        if(!checkCorrectPassword){
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const {password: hashedPassword, role, ...rest} = user

        console.log(process.env);
        //create jwt token
        const token = jwt.sign(
            {id: user.id, role: user.role},
            'gahg48589a45ajfjAUFAHHFIhufuu',
            {expiresIn: "15d"}
        )

        // set token in the browser cookies and send the response to the client
        res
        .cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn,
        })
        .status(200)
        .json({
            message: "Login Success!",
            token,
            data:{...rest},
            role,
        })

    }catch(err){
        console.error(err);  // log the error
        res
        .status(500)
        .json({success: false, message: "Failed to log in"})
    }
}

module.exports = {register, login}