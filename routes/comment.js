const { prisma } = require("../includes")
const commentRouter = require("express").Router()

commentRouter.get("/:postID", async function (req, res) {
  const postid = req.params.postID

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postid,
      },
      include: {
        post: true,
      },
    })

    res.json(comments).status(200)
  } catch (er) {
    res.json(er.message).status(404)
  }
})

commentRouter.post("/add", async function (req, res) {
  if (!req.body.postId)
    return res.sendStatus(401).json({ msg: "postid is required!" })

  try {
    const comment = await prisma.comment.create({
      data: req.body,
    })

    res.json(comment)
  } catch (er) {
    res.json(er.message)
  }
})

commentRouter.get("/:id", async function (req, res) {
  const id = req.params.id

  try {
    const comment = await prisma.comment.findMany({
      where: {
        id: id,
      },
    })

    res.json(comment).status(200)
  } catch (er) {
    res.json(er.message).status(500)
  }
})

module.exports = { commentRouter }
