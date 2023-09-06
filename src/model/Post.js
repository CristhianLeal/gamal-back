import { model, Schema } from 'mongoose'

const fotoSchema = new Schema({
  foto: {
    type: String,
    required: [true, 'El link foto es requerido']
  }
}, { _id: false })
const videoSchema = new Schema({
  video: {
    type: String,
    required: [true, 'El link video es requerido']
  }
}, { _id: false })
const reelSchema = new Schema({
  reel: {
    type: String,
    required: [true, 'El link reel es requerido']
  }
}, { _id: false })

const PostSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El Nombre es requerido']
    },
    description: {
      type: String,
      required: [true, 'la descripción es requerida']
    },
    picture: {
      type: String,
      required: [true, 'la foto de portada es requerida']
    },
    fotos: [fotoSchema],
    videos: [videoSchema],
    reels: [reelSchema]
  },
  {
    timestamps: true
  }
)

export default model('Post', PostSchema)
