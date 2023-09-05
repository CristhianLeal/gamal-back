import { isValidObjectId } from 'mongoose'
import Person from '../model/Person.js'

export const getPersons = async (req, res) => {
  try {
    const persons = await Person.find({})
    if (persons.length > 0) {
      return res.status(200).json({
        message: 'Personas retornadas con éxito',
        persons
      })
    } else {
      res.status(204).json({
        message: 'No hay personas',
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener personas',
      error: error.message
    })
  }
}

export const getPerson = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id del usuario no es válido'
    })
  }

  const person = await Person.findById(id)
  if (!person) {
    return res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }
  res.status(200).json({
    message: `Obtuviste un usuario llamado ${person.email}`,
    person
  })
}

export const createPerson = async (req, res) => {
  const { name, description, picture, insta, tiktok, gmail } = req.body
  const existName = await Person.findOne({ name })
  if (existName) {
    res.status(206).send('Este nombre ya esta en uso')
  } else {
    const person = await Person({ name, description, picture, insta, tiktok, gmail })
    try {
      await person.save()
      res.status(201).json({
        message: `Persona ${name} creada`,
        person: person.name
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo crear el usuario',
        fields: {
          name: error.errors?.name?.message,
          description: error.errors?.description?.message,
          picture: error.errors?.picture?.message,
          insta: error.errors?.insta?.message,
          tiktok: error.errors?.tiktok?.message,
          gmail: error.errors?.gmail?.message
        }
      })
    }
  }
}

export const deletePerson = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id de la persona no es valido'
    })
  }

  const person = await Person.findByIdAndDelete(id)
  if (!person) {
    return res.status(404).json({
      message: 'Persona no encontrado'
    })
  }
  res.status(200).json({
    message: `La persona con el nombre '${person?.name}' fue eliminada`
  })
}
