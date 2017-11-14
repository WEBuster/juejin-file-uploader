import UploadTask from './upload-task'

const DEFAULT_CONFIG = {
  bucket: '',
  uploadUrl: 'https://cdn-ms.xitu.io/v1/upload'
}

export default class JuejinFileUploader {

  constructor (config) {
    this.config = Object.assign(DEFAULT_CONFIG, config)
  }

  createTask (file) {
    return new UploadTask(file, this.config)
  }

}
