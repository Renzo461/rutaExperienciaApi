const express = require('express')

const { connection } = require('./conexion.js')
const knex = require('knex')(connection)

const app = express()
const PORT = 4040

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.listen(PORT, () => {
    console.log(`Server runnig at port ${PORT}`)
})

app.post('/login', (req, res) => {
    knex
        .select("*")
        .from("usuario")
        .join('coordinador', 'coordinador.IdUsuario', '=', 'usuario.IdUsuario')
        .join('carrera', 'carrera.IdCarrera', '=', 'coordinador.IdCarrera')
        .where('UsEmail', req.body.user)
        .andWhere('UsContrasena', req.body.password)
        .then(r=> {
            if (Object.keys(r).length >= 1) {
                res.status(200).send({
                    "log": true,
                    "message": "Logeo Exitoso",
                    "carrera": r[0].CaNombre
                })
            }
            else {
                res.status(400).send({
                    "log": false,
                    "message": "Usuario o Contraseña incorrecta"
                })
            }
        })
})