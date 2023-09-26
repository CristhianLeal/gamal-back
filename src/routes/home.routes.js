import { Router } from 'express'
import { getHomes, getHome, createHome, deleteHome, editHome } from '../controllers/home.controllers.js'
import { validateToken } from '../middlewares/validatesToken.js'

const router = Router()

router.get('/', getHomes)
router.get('/:id', getHome)
router.post('/', validateToken, createHome)
router.delete('/:id', validateToken, deleteHome)
router.put('/:id', validateToken, editHome)

export default router
