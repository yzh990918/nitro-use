import dayjs from 'dayjs';
import { createHash } from 'crypto'

export default eventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const AssetsBaseURL = 'http://' + event.req.headers.host + '/file'
  const res = []

  form.forEach(async item => {
    const extendName = item.filename.split('.').pop()
    const fileName = createHash('md5').update(item.data).digest('hex')
    res.push({
      filename: item.filename,
      url: `${AssetsBaseURL}/${dayjs().format('YYYY-MM-DD')}/${fileName}.${extendName}`
    })
    await useStorage().setItemRaw(`file/${dayjs().format('YYYY-MM-DD')}/${fileName}.${extendName}`, item.data)
  })

  return {
    data: res
  }
})
