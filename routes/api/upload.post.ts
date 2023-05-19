import fse from 'fs-extra'
import dayjs from 'dayjs';
import {createHash} from 'crypto'

export default eventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  const AssetsBaseURL = 'http://' + event.req.headers.host + '/file'
  const res = []

  const fileDir = `data/${dayjs().format('YYYY-MM-DD')}`
  if (!fse.existsSync(fileDir))
    await fse.mkdir(fileDir)
  
  form.forEach(async item => {
    const extendName = item.filename.split('.').pop()
    const fileName = createHash('md5').update(item.data).digest('hex')
    res.push({
      filename: item.filename,
      url: `${AssetsBaseURL}/${dayjs().format('YYYY-MM-DD')}/${fileName}.${extendName}`
    })
    await fse.writeFile(`${fileDir}/${fileName}.${extendName}`, item.data)
  })

  return {
    data: res
  }
})
