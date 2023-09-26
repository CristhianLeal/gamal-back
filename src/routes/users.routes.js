import { Router } from 'express'
import { getUsers, getUser, createUser, deleteUser, loginUser } from '.././controllers/users.controllers.js'
import { validateToken } from '../middlewares/validatesToken.js'
const router = Router()

router.get('/', validateToken, getUsers)
router.get('/:id', validateToken, getUser)
router.post('/', createUser)
router.delete('/:id', validateToken, deleteUser)
router.post('/login', loginUser)

export default router
