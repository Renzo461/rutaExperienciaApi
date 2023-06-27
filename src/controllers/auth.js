const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../conexion');

// const { generarJWT } = require('../helpers/jwt.js')

const newUsuario = async (req = request, res = response) => {
  const knex = require('knex')(connection);
  // ENCRIPTAR CONTRASEÑA
  const salt = bcrypt.genSaltSync();
  const newUser = [
    req.body.UsEmail,
    req.body.UsDNI,
    req.body.IdCarrera,
    bcrypt.hashSync(req.body.UsContrasena, salt),
    req.body.UsNombres,
    req.body.UsApellidos,
    req.body.UsTelefono,
  ];

  knex
    .raw('CALL post_user(?,?,?,?,?,?,?,@resultado)', newUser)
    .then(() => knex.raw('SELECT @resultado'))
    .then(([[result]]) => {
      const codigo = result['@resultado'];
      if (codigo === 400) {
        throw new Error('Email ya registrado');
      }
      if (codigo === 401) {
        throw new Error('Dni ya registrado');
      }
      if (codigo === 402) {
        throw new Error('Carrera no existe');
      }
      return res.status(201).json({
        ok: true,
        msg: `Se creo el coordinador`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Por Favor hable con el administrador',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const loginUsuario = async (req = request, res = response) => {
  const knex = require('knex')(connection);

  const { user, password } = req.body;

  knex
    .raw('CALL post_auth_login(?,?,@resultado,@usuario_data)', [user, password])
    .then(() => knex.raw('SELECT @resultado,@usuario_data'))
    .then(([[result]]) => {
      const codigo = result['@resultado'];
      const usuario = JSON.parse(result['@usuario_data']);
      const validPassword = bcrypt.compareSync(password, usuario.UsContrasena);
      delete usuario.UsContrasena;
      if (codigo === 500) {
        throw new Error('Usuario no existe');
      }
      if (!validPassword) {
        throw new Error('Contraseña incorrecta');
      }
      return res.status(200).json(usuario);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Por Favor hable con el administrador',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

module.exports = {
  loginUsuario,
  newUsuario,
};
