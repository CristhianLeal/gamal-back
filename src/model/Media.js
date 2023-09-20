import { model, Schema } from 'mongoose'

const MediaSchema = new Schema(
  {
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    created_at: { type: Date, default: Date.now() }
  }
)

export default model('Media', MediaSchema)
