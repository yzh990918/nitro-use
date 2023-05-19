import { defineNitroConfig } from 'nitropack/config'
import errorHandler from './error'

export default defineNitroConfig({
  renderer: './renderer',
  publicAssets: [
    {
      baseURL: '/_dist',
      dir: './public/_dist',
      maxAge: 60 * 60 * 24 * 365
    },
    {
      baseURL: '/data',
      dir: './data',
      maxAge: 60 * 60 * 24 * 365
    }
  ],
  storage: {
    'db': {
      driver: 'fs',
      base: './data/db'
    }
  },
  errorHandler: './error',
  devErrorHandler: errorHandler

})
