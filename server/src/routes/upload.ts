import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

// promisify the pipeline function from node
const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, rep) => {
    const upload = await req.file({
      limits: {
        fileSize: 1024 * 1024 * 5, // 5mb
      },
    })

    if (!upload) {
      return rep.status(400).send({
        message: 'No file received',
      })
    }

    // creat a regex that checks if the file is an image or video
    const mimetypeRegex = /^(image|video)\/[a-zA-Z0-9]+/

    const isValid = mimetypeRegex.test(upload.mimetype)

    if (!isValid) {
      return rep.status(400).send({
        message: 'Invalid file type',
      })
    }

    const fileid = randomUUID()
    // get the extension of the file
    const extension = extname(upload.filename)

    const fileName = `${fileid}${extension}`

    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', 'uploads', fileName),
    )

    await pump(upload.file, writeStream)

    // get the full url of the server (http://localhost:3333)
    const fullUrl = req.protocol.concat('://', req.hostname, ':3333')
    // create a new url with the file name
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl)

    return { fileUrl }
  })
}
