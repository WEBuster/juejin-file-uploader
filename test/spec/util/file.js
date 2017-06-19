export function createFile () {
  const file = new Blob(
    [new Array(1000).join('A')],
    { type: 'text/plain' }
  )
  file.name = Math.random()
  file.lastModifiedDate = new Date()
  return file
}
