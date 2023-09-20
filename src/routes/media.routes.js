import { Router } from 'express'
import { getImages, getImage, uploadImage } from '../controllers/media.controllers.js'

const router = Router()

router.get('/', getImages)
router.get('/:id', getImage)
router.post('/', uploadImage)
// router.delete('/:id', deleteVideo)
// router.put('/:id', editVideo)

export default router
