import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

// POSTS

app.get('/posts' , async (req, res) => {
    const posts = await prisma.posts.findMany({ include: { Comments: true } })
    res.send(posts)
})

app.get('/posts/:id', async (req, res) => {
    const post = await prisma.posts.findUnique({ 
        where: { id: Number(req.params.id) }, 
        include: { Comments: true }
    })
    if (post){
        res.send(post)
    }else {
        res.status(404).send({ error: 'Post does not exists! 😒' })
    }
})

app.post('/posts', async(req, res) => {
    const post = await prisma.posts.create({ data: req.body,
    include: { Comments: true }
    })
    res.send(post)
})

// COMMENTS

app.get('/comments' , async (req, res) => {
    const comments = await prisma.comments.findMany({ include: { post: true } })
    res.send(comments)
})

app.post('/comments', async(req, res) => {
    const post = await prisma.comments.create({ data: req.body,
    include: { post: true }
    })
    res.send(post)
})

// GENERAL

app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`)
})