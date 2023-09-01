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
    socialMed:
    {
      type: String,
      required: [true, 'La descripción es requerida']
    }
  },
  {
    timestamps: true
  }
)

export default model('User', PersonSchema)
