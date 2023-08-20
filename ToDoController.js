import ToDoService from './ToDoService.js'

class ToDoController {
  async create(req, res) {
    try {
      const toDo = await ToDoService.create(req.body/* , req.files.picture */)
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
      return res.json(toDo)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getAll(req, res) {
    try {

      const toDos = await ToDoService.getAll()

      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');

      let limit = Number(req.query.limit) || 20 //query после ?, params в url 
      let offset = Number(req.query.offset) || 0
      const totalCount = toDos.length
      const filterValue = req.query.query

      if (filterValue) {

        const toDosFilter = toDos.filter(todo => todo.toDoItem.toDo.includes(filterValue))
        const totalCountFilter = toDosFilter.length
        return res.json([toDosFilter.slice(offset, limit + offset), totalCountFilter])
      } else {
        return res.json([toDos.slice(offset, limit + offset), totalCount])
      }

    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async getOne(req, res) {
    try {

      const toDo = await ToDoService.getOne(req.params.id)
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');

      return res.json(toDo);

    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params
      const { completed } = req.body
      const { toDo } = req.body
      const updatetoDo = await ToDoService.update({ id, completed, toDo })//
      return res.json(updatetoDo)

    } catch (e) {
      res.status(500).json(e.message)
    }
  }


  /* async update(req, res) {
    try {
           const updatetoDo = await ToDoService.update(req.body)
      return res.json(updatetoDo)
    } catch (e) {
      res.status(500).json(e.message)
    }
  } */
  async delete(req, res) {
    try {

      const { id } = req.params

      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');

      const toDo = await ToDoService.delete(id)
      return res.json(toDo)

    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new ToDoController();