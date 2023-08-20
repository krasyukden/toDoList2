import * as uuid from 'uuid';
import * as path from 'path';


class FileService {
  saveFile(file) {

    try {
      const fileName = uuid.v4() + '.jpg'//сгенериррован id
      const filePath = path.resolve('static', fileName)// путь надиске куда  сохранять
      file.mv(filePath)//mv = move;
      return fileName;

    } catch (e) {
      console.log(e)
    }

  }
}
export default new FileService()