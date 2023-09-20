import Media from '../model/Media.js'

export const uploadImage = async (req, res) => {
  try {
    console.log('entro')
    const media = new Media()
    media.filename = req.file.name
    media.path = '/uploads/' + req.file.name
    media.originalname = req.file.originalname
    media.mimetype = req.file.mimetype
    media.size = req.file.size
    await media.save()
    res.status(201).json({
      message: 'Foto subida'
    })
  } catch (error) {
    console.error(error)
  }
}

export const getImage = (req, res) => {
  console.log('entro2')
}

export const getImages = async (req, res) => {
  console.log('entro3')
  const medias = await Media.find()
  res.render('index', { medias })
}
