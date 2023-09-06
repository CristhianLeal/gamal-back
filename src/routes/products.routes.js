import { Router } from 'express'
import { getProducts, getProduct, createProduct, deleteProduct, editProduct } from '../controllers/products.controllers.js'

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', createProduct)
router.delete('/:id', deleteProduct)
router.put('/:id', editProduct)

export default router
