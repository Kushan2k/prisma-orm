const authRouter = require("express").Router()
require("dotenv").config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { prisma } = require("../includes.js")

authRouter.post("/register", async function (req, res) {
  const data = req.body

  if (!data.email || !data.password) {
    return res
      .json({
        msg: "not enough fileds!",
      })
      .status(403)
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(data.password, salt)
  data.password = hash

  const user = await prisma.user.create({
    data: data,
  })

  const token = await jwt.sign(
    {
      email: data.email,
      name: data.name,
      id: user.id,
    },
    process.env.TOKEN_SECRET,
    {
      algorithm: "HS256",
      audience: "user",
      expiresIn: "10 day",
      issuer: "localhost",
    }
  )

  res
    .json({
      msg: "register success",
      token,
      user,
    })
    .status(201)
})

module.exports = { authRouter }
