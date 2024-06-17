const express = require("express");
const auth = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.register);
router.post("/logout", auth.logout);
router.post("/send-otp", auth.verify);
router.get("/change-password/:id", auth.changePassView);
router.post("/change-password", auth.savePassword);
router.put("/keamanan-akun/:id", auth.accountSecure);

module.exports = router;
