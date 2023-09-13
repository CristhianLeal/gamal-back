import { Router } from 'express'
import { getMetrics, getMetric, createMetric, deleteMetric, editMetric } from '../controllers/metrics.controllers.js'

const router = Router()

router.get('/', getMetrics)
router.get('/:id', getMetric)
router.post('/', createMetric)
router.delete('/:id', deleteMetric)
router.put('/:id', editMetric)

export default router
