import { createUploader } from './util/uploader'
import { createFile } from './util/file'
import { checkUrl } from './util/cdn'

describe('Init specs', () => {

  it('can init uploader', () => {
    const uploader = createUploader()
    expect(uploader).toBeDefined()
  })

  it('can init file', () => {
    const file = createFile()
    expect(file).toBeDefined()
  })

})
