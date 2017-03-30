# juejin-file-uploader
 web端上传资源到cdn的插件（ 依照七牛上传资源流程）

## 安装使用
```
npm install juejin-file-uploader

```

```html
<template>
  <div>
    <input type="file" @change="postFile($event.target.files[0])">
  </div>
</template>

<script>
import Uploader from 'juejin-file-uploader'

export default {
  methods: {
    postFile (_file) {
      let uploader = new Uploader({
        bucket: 'assets',
        tokenUrl: 'tokenUrl',
        uploadUrl: 'uploadUrl'
      })
      uploader.upload(_file)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
```

## 参数
```
var upload = new Uploader({
    "bucket": "bucket" //存储空间
    "uploadUrl": "uploadUrl" //上传文件至七牛云的接口地址
    "tokenUrl": "tokenUrl" //获取token的接口地址(juejin.im封装的接口)
  })
```
## 参数及接口流程说明

七牛云资源上传需要正确的token,key及formData才能上传成功，

而（token,key）的获取是需要（Access_Key,Secret_Key,bucket）通过 SDK取得的，

**tokenUrl** 接口就是用来取（token,key）的。

同时tokenUrl需要接收<bucket> 和<fileName> 参数；

    ps: <fileName>是插件根据选择的文件自动获取的,不用手动设置,只需配置<bucket>

**tokenUrl**接口响应后会返回含有token,key,url的json


插件会将这个json里面的（token,key）连同fileName（input选择的文件）一并传给七牛云接口 **uploadUrl**

如果文件上传成功, 插件会将**tokenUrl**返回的url当做参数resolve,

    ps: tokenUrl响应接口中的url是如果资源上传成功储存的位置


