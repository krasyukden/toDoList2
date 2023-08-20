import fileService from "./fileService.js";
import ToDo from "./ToDo.js";


class ToDoService {

  async create(toDo/* , picture */) {

    //const fileName = fileService.saveFile(picture)// возвращает наз файла

    const createdToDo = await ToDo.create(toDo /* {...post, picture: fileName} */)
    //файловое имя сохраняем в базе данных

    return createdToDo;

  }

  async getAll() {

    const toDos = await ToDo.find()//find() без параметров вернет все посты
    return toDos


  }
  async getOne(id) {
    if (!id) {
      throw new Error('Id does not exist')
    }
    const toDo = await ToDo.findById(id)
    return toDo
  }
  async update({ id, completed, toDo }) { //PATCH

    if (!id) {
      throw new Error('Id does not exist')
    }

    if (toDo) {
      const updateToDo = await ToDo.findByIdAndUpdate(id,
        {
          'toDoItem.toDo': toDo
        }
        , { new: true })

      return updateToDo

    } else {
      if (completed === false || completed === true) {
        const newCompleted = !completed;

        const updateToDo = await ToDo.findByIdAndUpdate(id,
          {
            'toDoItem.completed': newCompleted
          }
          , { new: true })

        return updateToDo
      }
    }
  }
  /* async update(toDo) { 
    
    if (!toDo._id) {
      throw new Error('Id does not exist')
    }
    toDo.toDoItem.completed = !toDo.completed;
    
    const updateToDo = await Post.findByIdAndUpdate(toDo._id, toDo, { new: true })
    return updateToDo
  
} */
  async delete(id) {
    if (!id) {
      throw new Error('Id does not exist')
    }
    const toDo = await ToDo.findByIdAndDelete(id)
    return toDo
  }
}

export default new ToDoService();