const { Router } = require('express')
const { getCarreras, getCarrera, postCarrera, putCarrera, deleteCarrera } = require('../controllers/carrera')

const router = Router()

router.get('/', getCarreras)

router.get('/:id', getCarrera)

// router.post('/', postCarrera)

// router.put('/:id', putCarrera)

// router.delete('/:id', deleteCarrera)

module.exports = router