import { isValidObjectId } from 'mongoose'
import Home from '../model/Home.js'

export const getHomes = async (req, res) => {
  try {
    const home = await Home.find({})
    if (home.length > 0) {
      return res.status(200).json({
        message: 'home retornado con éxito',
        home
      })
    } else {
      res.status(204).json({
        message: 'No hay home',
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener home',
      error: error.message
    })
  }
}

export const getHome = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id de home no es válido'
    })
  }

  const home = await Home.findById(id)
  if (!home) {
    return res.status(404).json({
      message: 'home no encontrado'
    })
  }
  res.status(200).json({
    message: 'Obtuviste home',
    home
  })
}

export const createHome = async (req, res) => {
  const { video, foto } = req.body
  const home = await Home({ video, fotos: foto })
  try {
    await home.save()
    res.status(201).json({
      message: 'home creada'
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo crear home',
      fields: {
        video: error.errors?.video?.message,
        fotos: error.errors?.fotos?.message
      }
    })
  }
}

export const deleteHome = async (req, res) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id de home no es valido'
    })
  }
  const home = await Home.findByIdAndDelete(id)
  if (!home) {
    return res.status(404).json({
      message: 'home no encontrado'
    })
  }
  res.status(200).json({
    message: 'Home fue eliminado'
  })
}

export const editHome = async (req, res) => {
  const { id } = req.params
  const { video, fotos } = req.body
  if (!isValidObjectId(id)) {
    return res.status(404).json({
      message: 'id no valida para edición'
    })
  }
  const homeById = await Home.findById(id)
  if (!homeById) {
    return res.status(404).json({
      message: 'Home no existente para edición'
    })
  }
  try {
    await Home.findByIdAndUpdate({ _id: id }, { video, fotos })
    res.status(201).json({
      message: 'Home editada'
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      fields: {
        video: error.errors?.video?.message,
        fotos: error.errors?.fotos?.message
      }
    })
  }
}
