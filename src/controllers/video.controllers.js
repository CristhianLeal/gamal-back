import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const conn = mongoose.createConnection(process.env.MONGO_CONNECTION)

// eslint-disable-next-line no-unused-vars
let gfs
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  })
})

const storage = new GridFsStorage({
  url: process.env.MONGO_CONNECTION,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'uploads',
        metadata: {
          userId: req.body
        }
      }
      resolve(fileInfo)
    })
  }
})
const upload = multer({
  storage
}).single('file')
export const uploadVideo = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(206).json({ error: err })
    } else {
      const fileId = req.file.id
      const tipo = req.file.metadata.tipo
      res.status(200).json({ success: true, fileId, tipo })
    }
  })
}

export const getVideo = (req, res) => {
  const fileId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    return res.status(400).json({ error: 'ID de video no válido' })
  }

  const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId))

  res.set('content-type', 'video/mp4')

  downloadStream.pipe(res)

  downloadStream.on('error', () => {
    res.status(404).json({ error: 'Video no encontrado' })
  })
}
