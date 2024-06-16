const jwt = require("jsonwebtoken");
const { isBlacklisted } = require("../middleware/tokenBlacklist");

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1]; // Mengambil token dari header 'Authorization: Bearer <token>'

  if (isBlacklisted(token)) {
    return res.sendStatus(403); // Token masuk dalam daftar hitam
  }

  jwt.verify(token, "gahg48589a45ajfjAUFAHHFIhufuu", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

module.exports = authentication;
