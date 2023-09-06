import { Router } from 'express'
import { getPersons, getPerson, createPerson, deletePerson, editPerson } from '../controllers/persons.controllers.js'

const router = Router()

router.get('/', getPersons)
router.get('/:id', getPerson)
router.post('/', createPerson)
router.delete('/:id', deletePerson)
router.put('/:id', editPerson)

export default router
