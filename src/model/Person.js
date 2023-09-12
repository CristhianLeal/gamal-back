import { model, Schema } from 'mongoose'

const PersonSchema = new Schema(
  {
    name:
    {
      type: String,
      required: [true, 'El nombre es requerido']
    },
    description:
    {
      type: String,
      required: [true, 'La descripción es requerida']
    },
    picture:
    {
      type: String,
      required: [true, 'La descripción es requerida']
    },
    insta:
    {
      type: String
    },
    face:
    {
      type: String
    },
    tiktok:
    {
      type: String
    },
    gmail:
    {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default model('Person', PersonSchema)
