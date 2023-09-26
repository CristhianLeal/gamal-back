import { Router } from 'express'
import { getPosts, getPost, createPost, deletePost, editPost } from '../controllers/posts.controllers.js'
import { validateToken } from '../middlewares/validatesToken.js'
const router = Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', validateToken, createPost)
router.delete('/:id', validateToken, deletePost)
router.put('/:id', validateToken, editPost)

export default router
