import { Router } from 'express'
import { getHomes, getHome, createHome, deleteHome, editHome } from '../controllers/Home.controllers.js'

const router = Router()

router.get('/', getHomes)
router.get('/:id', getHome)
router.post('/', createHome)
router.delete('/:id', deleteHome)
router.put('/:id', editHome)

export default router
