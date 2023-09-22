const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
  const token =
    req.headers.authorization?.split("Bearer ")[1] ||
    req.headers.Authorization?.split("Bearer ")[1] ||
    null

  if (!token) return res.json({ msg: "unauthorized!" }).status(403)

  const user = await jwt.verify(token, process.env.TOKEN_SECRET)

  if (user) {
    req.user = user
    next()
  } else {
    res.sendStatus(403)
  }
}
