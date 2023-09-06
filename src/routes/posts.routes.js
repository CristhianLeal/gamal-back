import { Router } from 'express'
import { getPosts, getPost, createPost, deletePost, editPost } from '../controllers/posts.controllers.js'

const router = Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', createPost)
router.delete('/:id', deletePost)
router.put('/:id', editPost)

export default router
