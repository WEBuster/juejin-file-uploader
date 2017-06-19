import { createUploader } from './util/uploader'
import { createFile } from './util/file'
import { checkUrl } from './util/cdn'

describe('Upload specs', () => {

  it('can upload single file', done => {
    const uploader = createUploader()
    const file = createFile()

    uploader.createTask(file).start()
    .then(checkUrl)
    .then(done)
    .catch(done.fail)
  })

  it('can upload multiple files', done => {
    const uploader = createUploader()
    const fileList = [createFile(), createFile()]
    const uploadTaskList = fileList.map(createUploadTask)

    Promise.all(uploadTaskList.map(task => task.start()))
    .then(urlList => Promise.all(urlList.map(checkUrl)))
    .then(done)
    .catch(done.fail)

    function createUploadTask (file) {
      return uploader.createTask(file)
    }
  })

})
