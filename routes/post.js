const postRouter = require("express").Router()

const { prisma } = require("../includes")

postRouter.get("/all", async function (req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
        author: true,
      },
    })

    res
      .json({
        data: posts,
      })
      .status(200)
  } catch (er) {
    res
      .json({
        msg: er.message,
      })
      .status(500)
  }
})

postRouter.post("/create", async function (req, res) {
  const d = req.body

  try {
    const post = await prisma.post.create({
      data: d,
    })

    res.json(post).status(201)
  } catch (er) {
    res.json({ msg: er.message }).status(500)
  }
})

module.exports = { postRouter }
