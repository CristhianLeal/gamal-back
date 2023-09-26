import { Router } from 'express'
import { getMetrics, getMetric, createMetric, deleteMetric, editMetric } from '../controllers/metrics.controllers.js'
import { validateToken } from '../middlewares/validatesToken.js'
const router = Router()

router.get('/', getMetrics)
router.get('/:id', getMetric)
router.post('/', validateToken, createMetric)
router.delete('/:id', validateToken, deleteMetric)
router.put('/:id', validateToken, editMetric)

export default router
