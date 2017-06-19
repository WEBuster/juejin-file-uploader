export function checkUrl (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('HEAD', url, true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) { return }
      switch (xhr.status) {
        case 200:
          resolve(url)
          break
        case 404:
          reject(new Error(`#checkUrl failed: url does not exist: ${url}`))
          break
        default:
          reject(new Error(`#checkUrl error with status: ${xhr.status}`))
      }
    }
    xhr.onerror = function () {
      reject(new Error(`#checkUrl error`))
    }
    xhr.send()
  })
}
