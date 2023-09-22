const userRouter = require("express").Router()

const { prisma } = require("../includes")

userRouter.get("/all", async function (req, res) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    res.json(users).status(200)
  } catch (er) {
    res.json({ msg: "error while fetching", er: er.message }).status(500)
  }
})

userRouter.get("/:id", async function (req, res) {
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
}) /
  userRouter.post("/add", async function (req, res) {
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
userRouter.post("/add/many", async function (req, res) {
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

userRouter.delete("/delete/:id", async function (req, res) {
  const id = req.params.id || null

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    })

    res.json({ msg: "deleted!" }).status(201)
  } catch (er) {
    res.json({ msg: er.message }).status(500)
  }

  res.json({ msg: "id is required" }).status(301)
})

module.exports = { userRouter }
