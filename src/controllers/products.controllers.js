import { isValidObjectId } from 'mongoose'
import Product from '../model/Product.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    if (products.length > 0) {
      return res.status(200).json({
        message: 'Productos retornados con éxito',
        products
      })
    } else {
      res.status(204).json({
        message: 'No hay productos',
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener productos',
      error: error.message
    })
  }
}

export const getProduct = async (req, res) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id del producto no es válido'
    })
  }
  const product = await Product.findById(id)
  if (!product) {
    return res.status(404).json({
      message: 'producto no encontrado'
    })
  }
  res.status(200).json({
    message: `Obtuviste un producto llamado ${product.productName}`,
    product
  })
}

export const createProduct = async (req, res) => {
  const { productName, description, picture, format } = req.body
  const existName = await Product.findOne({ productName })
  if (existName) {
    res.status(206).send('Este nombre ya esta en uso')
  } else {
    const product = await Product({ productName, description, picture, format })
    try {
      await product.save()
      res.status(201).json({
        message: `Producto ${productName} creado`,
        product: product.productName
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo crear el producto',
        fields: {
          productName: error.errors?.productName?.message,
          description: error.errors?.description?.message,
          picture: error.errors?.picture?.message,
          format: error.errors?.format?.message
        }
      })
    }
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id del producto no es valido'
    })
  }

  const product = await Product.findByIdAndDelete(id)
  if (!product) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    })
  }
  res.status(200).json({
    message: `El producto con el nombre '${product?.productName}' fue eliminado`
  })
}
