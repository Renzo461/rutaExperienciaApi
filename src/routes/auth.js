const { Router } = require('express')
const { loginUsuario, newUsuario } = require('../controllers/auth')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')


const router = Router()

router.post('/user',[
    check('UsEmail', 'El correo es obligatorio').isString(),
    check('UsContrasena', 'La contrasena es obligatoria').isString(),
    check('UsNombres', 'El nombre es obligatorio').isString(),
    check('UsApellidos', 'El apellido es obligatorio').isString(),
    check('UsEmail', 'El correo es obligatorio').isString(),
    check('UsTelefono', 'El correo es obligatorio').isString(),
    check('UsDNI', 'El DNI es obligatorio').isString().isLength(8),
    check('IdCarrera', 'La carrera es obligatoria').isNumeric(),
    validarCampos
] ,newUsuario)


router.post('/login', [
    check('user', 'El usuario es obligatorio').isString(),
    check('password', 'La contraseña es obligatoria').isString(),
    validarCampos
], loginUsuario)

module.exports = router