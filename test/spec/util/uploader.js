export function createUploader () {
  return new JuejinFileUploader({
    bucket: 'temp'
  })
}
