const express = require("express")
const { PrismaClient } = require("@prisma/client")
require("dotenv").config()

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 9091

app.get("/", async function (req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return res.send({ msg: "hello world", posts }).status(200)
  } catch (er) {
    return res
      .send({
        msg: er.message,
      })
      .status(404)
  }
})

app.get("/api/v1/user/all", async function (req, res) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    res.json(users).status(200)
  } catch (er) {
    res.json({ msg: "error while fetching" }).status(500)
  }
})

app.get("/api/v1/user/:id", async function (req, res) {
  const id = req.params.id || null

  if (id) {
    try {
      const user = await prisma.user.findMany({
        where: {
          id: id,
        },
      })

      res.json(user).status(200)
    } catch (er) {
      res.json({ msg: er.message }).status(404)
    }
  } else {
    res.json({ msg: "id is required" }).status(403)
  }
})

app.post("/api/v1/user/add", async function (req, res) {
  const d = req.body

  try {
    const user = await prisma.user.create({
      data: d,
    })
    res.json(user).status(201)
  } catch (er) {
    res.status(500).send({
      msg: er.message,
    })
  }
})
app.post("/api/user/add/many", async function (req, res) {
  const d = req.body

  try {
    const users = await prisma.user.createMany({
      data: d,
    })
    res.json(users).status(201)
  } catch (er) {
    res.status(500).send({
      msg: er.message,
    })
  }
})

app.listen(PORT)
