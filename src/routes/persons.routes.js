import { Router } from 'express'
import { getPersons, getPerson, createPerson, deletePerson, editPerson } from '../controllers/persons.controllers.js'
import { validateToken } from '../middlewares/validatesToken.js'
const router = Router()

router.get('/', getPersons)
router.get('/:id', getPerson)
router.post('/', validateToken, createPerson)
router.delete('/:id', validateToken, deletePerson)
router.put('/:id', validateToken, editPerson)

export default router
