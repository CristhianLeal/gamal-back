import { isValidObjectId } from 'mongoose'
import Metric from '../model/Metric.js'

export const getMetrics = async (req, res) => {
  try {
    const metrics = await Metric.find({})
    if (metrics.length > 0) {
      return res.status(200).json({
        message: 'metricas retornadas con éxito',
        metrics
      })
    } else {
      res.status(204).json({
        message: 'No hay metricas',
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener metricas',
      error: error.message
    })
  }
}

export const getMetric = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id de la metrica no es válida'
    })
  }

  const metric = await Metric.findById(id)
  if (!metric) {
    return res.status(404).json({
      message: 'metrica no encontrada'
    })
  }
  res.status(200).json({
    message: 'Obtuviste un metrica llamada',
    metric
  })
}

export const createMetric = async (req, res) => {
  const { description, people, man, woman, face, insta, twitter, youtube } = req.body
  const metric = await Metric({ description, people, man, woman, face, insta, twitter, youtube })
  try {
    await metric.save()
    res.status(201).json({
      message: 'Metrica creada'
    })
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo crear la metrica',
      fields: {
        description: error.errors?.description?.message,
        people: error.errors?.people?.message,
        man: error.errors?.man?.message,
        woman: error.errors?.woman?.message,
        face: error.errors?.face?.message,
        insta: error.errors?.insta?.message,
        twitter: error.errors?.twitter?.message,
        youtube: error.errors?.youtube?.message
      }
    })
  }
}

export const deleteMetric = async (req, res) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id de la metrica no es valida'
    })
  }
  const metric = await Metric.findByIdAndDelete(id)
  if (!metric) {
    return res.status(404).json({
      message: 'metrica no encontrada'
    })
  }
  res.status(200).json({
    message: 'La metrica fue eliminada'
  })
}

export const editMetric = async (req, res) => {
  const { id } = req.params
  const { description, people, man, woman, face, insta, twitter, youtube } = req.body
  if (!isValidObjectId(id)) {
    return res.status(404).json({
      message: 'metrica no valida para edición'
    })
  }
  const metricById = await Metric.findById(id)
  if (!metricById) {
    return res.status(404).json({
      message: 'Metrica no existente para edición'
    })
  }
  try {
    await Metric.findByIdAndUpdate({ _id: id }, { description, people, man, woman, face, insta, twitter, youtube })
    res.status(201).json({
      message: 'Metrica editada'
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      fields: {
        description: error.errors?.description?.message,
        people: error.errors?.people?.message,
        man: error.errors?.man?.message,
        woman: error.errors?.woman?.message,
        face: error.errors?.face?.message,
        insta: error.errors?.insta?.message,
        twitter: error.errors?.twitter?.message,
        youtube: error.errors?.youtube?.message
      }
    })
  }
}
