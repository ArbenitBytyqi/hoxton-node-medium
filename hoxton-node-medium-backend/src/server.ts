import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

// HOME PAGE

app.get('/', (req, res) => {
    res.send(`
    <h1>Hello King, this is a Blog app.</h1>
    <h2>Available posts:</h2>
    <ul>
        <li><a href="/posts">Posts</a></li>
    </ul>
    `)
})

// POSTS

app.get('/posts' , async (req, res) => {
    const posts = await prisma.posts.findMany({ include: { likes: true, comments: true } })
    res.send(posts)
})

app.get('/posts/:id', async (req, res) => {
    const post = await prisma.posts.findUnique({ 
        where: { id: Number(req.params.id) }, 
        include: { likes: true, comments: true }
    })
    if (post){
        res.send(post)
    }else {
        res.status(404).send({ error: 'Post does not exists! 😒' })
    }
})

app.post('/posts', async (req, res)=>{
    const post = {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image
    }
    let errors: string[] = []
  
      if (typeof req.body.title !== 'string') {
          errors.push('Title not given!')
        }

      if (typeof req.body.content !== 'string') {
          errors.push('Write posts content!')
        }

      if(typeof req.body.image  !=='string') {
          errors.push('Image URL not given')
        }

      if( errors.length === 0)  {
        try{
            const newPost = await prisma.posts.create({
              data: {
                title: post.title,
                content :post.content,
                image:post.image,
              },
              include: { likes: true, comments:true }
            })
            res.send(newPost)
          } catch(err) {
            // @ts-ignore
            res.status(400).send({errors: errors})
          }
      }
})

app.delete('/posts/:id', async (req, res) => {
    try {
        const post = await prisma.posts.delete({
          where: { id: Number(req.params.id) }
        })
        res.send(post)
      } catch (error) {
        res.status(400).send({ error: 'Post could not be deleted!' })
      }
})

// LIKES

app.get('/likes', async(req, res)=>{
    const likes = await prisma.likes.findMany()
    res.send(likes)
})

app.post('/likes', async (req, res)=>{
    const like = {
      postsId: req.body.postsId
    }
    
    try{
      const likePost = await prisma.likes.create({
        data: {
          postsId: like.postsId
        },
        include: { post: true }
      })
      res.send(likePost)
    } catch(error) {
      // @ts-ignore
      res.status(400).send({ error: 'Post could not be liked!' })
    }
  
  })

// COMMENTS

app.get('/comments' , async (req, res) => {
    const comments = await prisma.comments.findMany({ include: { post: true } })
    res.send(comments)
})

app.post('/comments', async(req, res) => {
    const comment = {
        content:req.body.content,
        postsId: req.body.postsId
      }
      
      try{
        const commentPost = await prisma.comments.create({
          data: {
            content:comment.content, 
            postsId:comment.postsId
          },
          include: { post:true }
        })
        res.send(commentPost)
      } catch(error) {
        // @ts-ignore
        res.status(400).send({ error: 'Comment could not be added!' })
      }
    
    })

// GENERAL

app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`)
})