import { model, Schema } from 'mongoose'

const HomeSchema = new Schema(
  {
    video:
    {
      type: String,
      required: [true, 'La descripción es requerida']
    },
    fotos: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model('Home', HomeSchema)
