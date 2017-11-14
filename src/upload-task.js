export default class UploadTask {

  constructor (file, { bucket, uploadUrl }) {
    this.file = file
    this.bucket = bucket
    this.uploadUrl = uploadUrl
    this.uploadXhr = new XMLHttpRequest()
    this.abortError = null
  }

  start () {
    return uploadFile({
      file: this.file,
      bucket: this.bucket,
      uploadUrl: this.uploadUrl,
      xhr: this.uploadXhr
    })
    .then(res => res.d.url.https)
    .catch(error => Promise.reject(this.abortError || error))
  }

  abort (reason) {
    this.abortError = createAbortError(reason)
    this.uploadXhr.abort()
  }

}

function uploadFile ({ file, bucket, uploadUrl, xhr }) {
  const form = new FormData()
  const queryPrefix = uploadUrl.indexOf('?') === -1 ? '?' : '&'
  form.append('file', file)
  return sendRequest({
    method: 'POST',
    url: `${uploadUrl}${queryPrefix}bucket=${bucket}`,
    data: form,
    xhr
  })
}

function sendRequest ({ xhr, method, url, data }) {
  return new Promise((resolve, reject) => {
    xhr.open(method, url, true)
    xhr.responseType = 'json'
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) { return }
      if (xhr.status === 200) {
        const res = xhr.response
        resolve(typeof res === 'string' ? JSON.parse(res) : res)
      } else {
        reject(new Error(xhr.statusText))
      }
    }
    xhr.onerror = function () {
      reject(new Error(xhr.statusText))
    }
    xhr.send(data)
  })
}

function createAbortError (reason) {
  return Object.assign(new Error('upload aborted'), {
    aborted: true,
    reason
  })
}
