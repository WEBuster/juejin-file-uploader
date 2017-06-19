import { createUploader } from './util/uploader'
import { createFile } from './util/file'
import { checkUrl } from './util/cdn'

describe('Abort specs', () => {

  it('can abort upload', done => {
    const uploader = createUploader()
    const file = createFile()
    const reason = Date.now()

    const uploadTask = uploader.createTask(file)

    uploadTask.start()
    .then(url => done.fail(new Error('abort failed')))
    .catch(error => {
      if (error.aborted) {
        expect(error.reason).toEqual(reason)
        done()
      } else {
        done.fail(error)
      }
    })

    uploadTask.abort(reason)
  })

})
