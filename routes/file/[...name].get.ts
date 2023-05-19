import path from 'path'
import {Readable} from 'stream'

export default defineEventHandler(async (event) => {
  const filePath = path.join('file',event.context.params.name);

  const buffer = await useStorage().getItemRaw(filePath) as Buffer
  return sendStream(event, Readable.from(buffer));
});
