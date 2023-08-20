import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './router.js'
import fileUpload from 'express-fileupload'
import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()

const port = 5000

const PASSWORD = process.env.DB_PASSWORD

const DB_URL = `mongodb+srv://user:${PASSWORD}@cluster0.yrgzn.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(express.json())//for json

app.use('/api', router)
//app.use('/users', userRouter)// для users
app.use(fileUpload({}))// зарегистр


const client = new MongoClient(DB_URL);

export const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  //"Access-Control-Allow-Credentials": true,
  //"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
  'Access-Control-Allow-Origin': '*'/* 'http://localhost:3000' */,
  withCredentials: true
}

app.use(cors( corsOptions))

async function startApp() {
  try {

    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })// подключ к базе данных
    app.listen(port, () => console.log('OK' + port))

  } catch (e) {
    console.log(console.log(e))
  }
}

startApp()


