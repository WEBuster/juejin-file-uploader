import UploadTask from './upload-task'

const DEFAULT_CONFIG = {
  bucket: '',
  tokenUrl: 'https://cdn-ms.xitu.io/v1/policy/info',
  uploadUrl: 'https://up.qbox.me'
}

export default class JuejinFileUploader {

  constructor (config) {
    this.config = Object.assign(DEFAULT_CONFIG, config)
  }

  createTask (file) {
    return new UploadTask(file, this.config)
  }

}
