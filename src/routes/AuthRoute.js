const express = require("express");
const auth = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.register);
router.get("/logout", auth.logout);
router.post("/send-otp", auth.verify);
router.get("/change-password/:id", auth.changePassView);
router.post("/change-password", auth.savePassword);

module.exports = router;
