const express = require("express")

const { userRouter } = require("./routes/user.js")
const { postRouter } = require("./routes/post.js")
const { prisma } = require("./includes.js")
const { authRouter } = require("./routes/auth.js")
const checkauth = require("./middlewares/checkauth.js")
require("dotenv").config()
const cors = require("cors")
const { commentRouter } = require("./routes/comment.js")

const app = express()
app.use(express.json())
app.use(cors())

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
      take: 5,
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

app.use("/auth", authRouter)
app.use("/api/v1/post", checkauth, postRouter)
app.use("/api/v1/user", checkauth, userRouter)
app.use("/api/v1/comment", checkauth, commentRouter)

app.listen(PORT)
