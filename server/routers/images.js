const imageRouter = require('express').Router()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const Image = require('../models/image')


// Set Storage Engine
const storage = multer.diskStorage({
  //destination: './public/uploads/',
  destination: (req, file, cb) => {
    cb (null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    //const fileName = file.originalname.toLowerCase().split(' ').join('-')
    //cb(null, file.fieldname + '-' + Date.now() + 
    //path.extname(file.originalname))
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
    
})

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}) //.single('file')

// Check File Type
const checkFileType = (file, cb) => {
  // Allowed extencion
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname
    (file.originalname).toLowerCase())
    // Check mime
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    }else {
      cb('Error: Images Only!')
    }
}

imageRouter.post('/', upload.single('file'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  //console.log('fiename:', req)
  const img = new Image({
    _id: new mongoose.Types.ObjectId(),
    name: req.file.filename,  //req.body.name,
    productImg: url + '/public/uploads/' + req.file.filename
  })

  
  img.save().then(result => {

    res.status(201).json({
      message: 'Img added successfully',
      imgCreated: {
        _id: result._id,
        productImg: result.productImg
      }
    })
  }).catch (err => {
    console.log(err),
      res.status(500).json({
        error: err
      })
  })
})

imageRouter.put('/:id', upload.single('file'), async (req, res) => {
  const body = req.body
  const url = req.protocol + '://' + req.get('host')
  try {
    const newImage = {
      name: req.file.filename,
      productImg: url + '/public/uploads/' + req.file.filename
    }
    
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id, newImage, { new: true }
    )

    res.status(200).json(updatedImage.toJSON())
  }catch (err) {
    console.log('error: ', err)
  }
})

imageRouter.get('/', async (req, res) => {
  const images = await Image.find({})
  res.send(images)
 /*  Image.find({}).then(data => {
    /* res.status(200).json({
      message: 'Picture retrieved successfully',
      data: data
    }) */
    //res.status(200).json(data) */
  //})
})

module.exports = imageRouter