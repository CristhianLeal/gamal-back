import { model, Schema } from 'mongoose'

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
    fotos: [
      {
        type: String
      }
    ],
    videos: [
      {
        type: String
      }
    ],
    reels: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model('Post', PostSchema)
