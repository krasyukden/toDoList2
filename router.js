import Router from 'express'
import PostController from './ToDoController.js'
import cors from 'cors'

 const corsOptions ={
  origin: '*', 
  credentials:true,            
  optionSuccessStatus:200,
  //'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*'/* 'http://localhost:3000' */ /* true */,
  withCredentials: true
} 

const router = new Router()

router.post('/toDo', PostController.create , cors( corsOptions ))
router.get('/toDo', PostController.getAll , cors( corsOptions ))
router.get('/toDo/:id', PostController.getOne , cors( corsOptions ))
//router.put('/toDo/:id', PostController.update, cors(corsOptions))
router.patch('/toDo/:id', PostController.update , cors( corsOptions ))
router.delete('/toDo/:id', PostController.delete, cors( corsOptions ))

export default router;