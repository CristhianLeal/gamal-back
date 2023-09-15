import { Router } from 'express'
import { getVideo, uploadVideo } from '../controllers/video.controllers.js'

const router = Router()

router.get('/:id', getVideo)
// router.get('/:id', getVideo)
router.post('/', uploadVideo)
// router.delete('/:id', deleteVideo)
// router.put('/:id', editVideo)

export default router
