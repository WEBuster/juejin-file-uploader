# juejin-file-uploader

[![Build Status](https://img.shields.io/travis/WEBuster/juejin-file-uploader.svg?style=flat-square)](https://travis-ci.org/WEBuster/juejin-file-uploader)
[![Version](https://img.shields.io/npm/v/juejin-file-uploader.svg?style=flat-square)](https://www.npmjs.com/package/juejin-file-uploader)
[![License](https://img.shields.io/npm/l/juejin-file-uploader.svg?style=flat-square)](LICENSE)

[掘金](https://juejin.im) 浏览器端文件上传插件。

## 安装

```bash
npm i -S juejin-file-uploader
```

## 使用

### 初始化

#### 模块化环境

```js
import FileUploader from 'juejin-file-uploader'

const fileUploader = new FileUploader({
  bucket: 'temp'
})
```

#### 浏览器直引

```html
<script src="path/to/juejin-file-uploader.min.js"></script>
```

```js
var fileUploader = new JuejinFileUploader({
  bucket: 'temp'
})
```

### 单文件

```js
fileUploader.createTask(file).start()
.then(url => {
  console.log(url)
})
.catch(error => {
  console.error(error)
})
```

### 多文件

```js
const uploadTaskList = fileList.map(createUploadTask)

Promise.all(uploadTaskList)
.then(resultList => {
  console.log(resultList)
})

function createUploadTask (file) {
  return fileUploader.createTask(file).start()
  .then(url => ({ url }))
  .catch(error => ({ error }))
}
```

### 取消上传

```js
const uploadTask = fileUploader.createTask(file)

uploadTask.start()
.then(url => {
  console.log(url)
})
.catch(error => {
  if (error.aborted) {
    console.log('上传已被主动取消', error.reason)
  } else {
    console.error(error)
  }
})

uploadTask.abort('不想上传了')
```

## 前置需求

- 支持 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
