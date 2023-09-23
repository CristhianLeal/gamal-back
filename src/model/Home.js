import { model, Schema } from 'mongoose'

const HomeSchema = new Schema(
  {
    video:
    {
      type: String
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
