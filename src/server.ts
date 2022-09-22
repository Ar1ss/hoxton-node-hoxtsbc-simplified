import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

const port = 3456

app.get('/users' , async (req , res) => {})

app.post('/sign-up' , async (req , res) => {
    const user = await prisma.user.create({
        data : {
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password)
        }
    })
    res.send(user)
})

app.get ('/sign-up' , async (req , res) => {
    const users = await prisma.user.findMany()
    res.send(users)
})


app.post('/sign-in' , async (req , res) => {
    const user = await prisma.user.findUnique({
        where : {
            email : req.body.email
        }
    })
    if(user && bcrypt.compareSync(req.body.password , user.password)){
        res.send(user)
    }else{
        res.status(401).send('Invalid email or password')
    }
})

app.get ('/sign-in' , async (req , res) => {
    const user = await prisma.user.findUnique({
        where : {
            email : req.body.email
        }
    })
    if(user && bcrypt.compareSync(req.body.password , user.password)){
        res.send(user)
    }else{
        res.status(401).send('Invalid email or password')
    }
})


app.listen(port , () => {
    console.log(`App running : http://localhost:${port}`)
})
