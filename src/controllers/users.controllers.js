import { isValidObjectId } from 'mongoose'
import User from '../model/User.js'
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    if (users.length > 0) {
      return res.status(200).json({
        message: 'Usuarios retornados con éxito',
        users
      })
    } else {
      res.status(204).json({
        message: 'No hay usuarios',
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener usuarios',
      error: error.message
    })
  }
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
    message: `Obtuviste un usuario llamado ${user.email}`,
    user
  })
}

export const createUser = async (req, res) => {
  const { email, password, code } = req.body
  if (code === '112233') {
    const existEmail = await User.findOne({ email })
    if (existEmail) {
      res.status(206).send('Este correo electrónico ya esta en uso')
      return
    } else {
      const user = await User({ email, password })
      const claveToken = process.env.CLAVE
      const token = jwt.sign({ user }, claveToken, { expiresIn: '1h' })
      try {
        await user.save()
        res.status(200).json({
          message: `Usuario ${email} creado`,
          user: user.email,
          token
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
    message: `El usuario con el nombre '${user?.email}' fue eliminado`
  })
}

export const loginUser = async (req, res) => {
  const claveToken = process.env.CLAVE
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      if (password === user.password) {
        const token = jwt.sign({ user }, claveToken, { expiresIn: '1h' })
        return res.status(200).json({ user, token })
      } else {
        return res.status(206).json({ message: 'Datos incorrectos.' })
      }
    } else {
      return res.status(206).json({ message: 'Datos incorrectos.' })
    }
  } catch (error) {
    console.error(error)
    return res.status(206).json({ message: 'Ha ocurrido un error inesperado' })
  }
}
