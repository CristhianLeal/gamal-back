import { model, Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
    productName:
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
    format:
    {
      type: String,
      required: [true, 'La descripción es requerida']
    }
  },
  {
    timestamps: true
  }
)

export default model('Product', ProductSchema)
