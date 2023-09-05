import { Router } from 'express'
import { getPersons, getPerson, createPerson, deletePerson } from '.././controllers/person.controllers.js'

const router = Router()

router.get('/', getPersons)
router.get('/:id', getPerson)
router.post('/', createPerson)
router.delete('/:id', deletePerson)

export default router
