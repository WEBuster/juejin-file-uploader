export default class UploadTask {

  constructor (file, { bucket, tokenUrl, uploadUrl }) {
    this.file = file
    this.bucket = bucket
    this.tokenUrl = tokenUrl
    this.uploadUrl = uploadUrl

    this.infoXhr = new XMLHttpRequest()
    this.uploadXhr = new XMLHttpRequest()
    this.abortError = null
  }

  start () {
    return getUplaodInfo({
      filename: this.file.name,
      tokenUrl: this.tokenUrl,
      bucket: this.bucket,
      xhr: this.infoXhr
    })
    .then(({ token, key, url }) =>
      uploadFile({
        key,
        token,
        file: this.file,
        uploadUrl: this.uploadUrl,
        xhr: this.uploadXhr
      })
      .then(() => url)
    )
    .catch(error => Promise.reject(this.abortError || error))
  }

  abort (reason) {
    this.abortError = createAbortError(reason)
    this.infoXhr.abort()
    this.uploadXhr.abort()
  }

}

function getUplaodInfo ({ filename, tokenUrl, bucket, xhr }) {
  const url = `${tokenUrl}?bucket=${bucket}&filename=${filename}`
  return sendRequest({
    method: 'GET',
    url,
    xhr
  })
  .then(res => res.d)
  .then(info => ({
    token: info.token,
    key: info.key,
    url: info.url.https
  }))
}

function uploadFile ({ file, key, token, uploadUrl, xhr }) {
  const form = new FormData()
  form.append('token', token)
  form.append('file', file)
  form.append('key', key)
  return sendRequest({
    method: 'POST',
    url: uploadUrl,
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
