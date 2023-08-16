import { isValidObjectId } from 'mongoose'
import User from '../model/User.js'

export const getUsers = async (req, res) => {
  const { limit = 10, from = 0 } = req.query
  const [users, total] = await Promise.all([
    User.find({})
      .skip(Number(from))
      .limit(Number(limit)),
    User.count()
  ])
  if (users) {
    return res.status(200).json({
      message: 'Usuarios retornados con éxito',
      total,
      users
    })
  }
  res.status(204).json({
    message: 'No hay usuarios',
    data: []
  })
  res.json('obtuviste los usuarios')
}

export const getUser = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id del usuario no es válido'
    })
  }

  const user = await User.findById(id)
  if (!user) {
    return res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }
  res.status(200).json({
    message: `Obtuviste un usuario llamado ${user.name}`,
    user
  })
}

export const createUser = async (req, res) => {
  const { email, password,code} = req.body
  
  if (code === '112233'){
    const user = await User({ email, password})
    try {
      await user.save()
      res.status(201).json({
        message: `Usuario ${email} creado`,
        user: user.email
      })
      return
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo crear el usuario',
        fields: {
          email: error.errors?.email?.message,
          password: error.errors?.password?.message
        }
      })
      return
    }
  }
  return res.status(500).json({
    message: 'No se pudo crear el usuario'
  })
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id de usuario no es valido'
    })
  }

  const user = await User.findByIdAndDelete(id)
  if (!user) {
    return res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }
  res.status(200).json({
    message: `El usuario con el nombre '${user?.name}' fue eliminado`
  })
}
