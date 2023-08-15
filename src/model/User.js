import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    email:
    {
      type: String,
      required: [true, 'El mail es requerido']
    },
    password:
    {
      type: String,
      required: [true, 'La contraseña es requerida']
    }
  },
  {
    timestamps: true
  }
)

export default model('User', UserSchema)
