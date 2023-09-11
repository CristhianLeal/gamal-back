import { isValidObjectId } from 'mongoose'
import Post from '../model/Post.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    if (posts.length > 0) {
      return res.status(200).json({
        message: 'Post retornados con éxito',
        posts
      })
    } else {
      res.status(204).json({
        message: 'No hay Post',
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener Post',
      error: error.message
    })
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id del Post no es válido'
    })
  }
  const post = await Post.findById(id)
  if (!post) {
    return res.status(404).json({
      message: 'Post no encontrado'
    })
  }
  res.status(200).json({
    message: `Obtuviste un Post llamada ${post.name}`,
    post
  })
}

export const createPost = async (req, res) => {
  const { name, description, picture, foto, video, reel } = req.body
  const existName = await Post.findOne({ name })
  if (existName) {
    res.status(206).send('Este nombre ya esta en uso')
  } else {
    const post = await Post({ name, description, picture, fotos: foto, videos: video, reels: reel })
    try {
      await post.save()
      res.status(201).json({
        message: `Post ${name} creada`,
        post: post.name
      })
    } catch (error) {
      res.status(500).json({
        message: 'No se pudo crear el Post',
        fields: {
          name: error.errors?.name?.message,
          description: error.errors?.description?.message,
          picture: error.errors?.picture?.message,
          insta: error.errors?.insta?.message,
          tiktok: error.errors?.tiktok?.message,
          gmail: error.errors?.gmail?.message
        }
      })
    }
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'El id del Post no es valido'
    })
  }

  const post = await Post.findByIdAndDelete(id)
  if (!post) {
    return res.status(404).json({
      message: 'Post no encontrado'
    })
  }
  res.status(200).json({
    message: `El post con el nombre '${post?.name}' fue eliminado`
  })
}

export const editPost = async (req, res) => {
  const { id } = req.params
  const { name, description, picture, foto, video, reel } = req.body
  if (!isValidObjectId(id)) {
    return res.status(404).json({
      message: 'post: no es valido para edición'
    })
  }
  const postById = await Post.findById(id)
  if (!postById) {
    return res.status(404).json({
      message: 'Post: no existente para edición'
    })
  }

  const postByName = await Post.findOne({ name })
  if (postByName && postById.name !== name) {
    return res.status(400).json({
      message: 'El nombre del Post ya existe'
    })
  }

  try {
    await Post.findByIdAndUpdate({ _id: id }, { name, description, picture, fotos: foto, videos: video, reels: reel })
    res.status(201).json({
      message: `Post ${name} editado`
    })
  } catch (error) {
    res.status(400).json({
      message: 'Ha ocurrido un error',
      fields: {
        name: error.errors?.name?.message,
        description: error.errors?.description?.message,
        picture: error.errors?.picture?.message,
        fotos: error.errors?.fotos?.message,
        videos: error.errors?.videos?.message,
        reels: error.errors?.reels?.message
      }
    })
  }
}
