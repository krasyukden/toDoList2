import mongoose from 'mongoose'

const ToDo = new mongoose.Schema(
  {
    toDoItem: {
      toDo: { type: String, required: true },
      completed: { type: Boolean , required: true }
    }
  })

export default mongoose.model('Post', ToDo)// модель 'ToDo', на основе схемы, что описана выше