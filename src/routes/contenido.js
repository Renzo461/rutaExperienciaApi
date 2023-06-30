const upload = require('../helpers/multer');
const { Router } = require('express');
const {
  //   getContenidos,
  //   getContenido,
  getContenidosExperiencia,
  postContenido,
  putContenido,
  deleteContenido,
} = require('../controllers/contenido');

const router = Router();

// router.get('/', getContenidos)

// router.get("/:IdContenido", getContenido);

router.get('/experiencia/:IdExperiencia', getContenidosExperiencia);

router.post('/', upload.single('CoFile'), postContenido);

//router.put('/:IdContenido', upload.single('CoFile'), putContenido);

router.put('/:IdContenido', upload.single('CoFile'), putContenido);

router.delete('/:IdContenido', deleteContenido);

module.exports = router;
