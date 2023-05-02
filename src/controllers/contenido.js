const { request, response } = require('express')
const knex = require('../conexion.js')

const getContenidos = async (req = request, res = response) => {
    await knex
        .select('*')
        .from('tblContenido')
        .then(contenidos => {
            return res.status(200).json(contenidos)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}

const getContenido = async (req = request, res = response) => {

    const IdContenido = req.params.IdContenido

    await knex
        .select('*')
        .from('tblContenido')
        .where('IdContenido', IdContenido)
        .then(([contenido]) => {
            return res.status(200).json(contenido)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}

const getContenidosExperiencia = async (req = request, res = response) => {

    const IdExperiencia = req.params.IdExperiencia

    await knex
        .select('*')
        .from('tblContenido')
        .where('IdExperiencia', IdExperiencia)
        .then(contenidos => {
            return res.status(200).json(contenidos)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}

const postContenido = async (req = request, res = response) => {

    const newContenido = req.body

    await knex
        .insert(newContenido)
        .into("tblContenido")
        .then(([id]) => {
            return res.status(201).json({
                ok: true,
                msg: `Se creo el contenido con id ${id}`,
                id
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'No se pudo crear el contenido, Media o Experiencia no existe'
            })
        })

}

const putContenido = async (req = request, res = response) => {

    const IdContenido = req.params.IdContenido
    const contenido = req.body

    await knex('tblContenido')
        .where("IdContenido", IdContenido)
        .update(contenido)
        .then(r => {
            if (!r) {
                // NO SE PUDO EDITAR EL CONTENIDO
                return res.status(400).json({
                    ok: false,
                    msg: `Contenido ${IdContenido} no existe`
                })

            }

            return res.status(200).json({
                ok: true,
                msg: `Contenido ${IdContenido} editado`
            })

        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}

const deleteContenido = async (req = request, res = response) => {
    const IdContenido = req.params.IdContenido
    await knex('tblContenido')
        .where("IdContenido", IdContenido)
        .del()
        .then(contenido => {
            if (!contenido) {
                return res.status(404).json({
                    ok: false,
                    msg: `Contenido ${IdContenido} no existe`
                })
            }
            
            return res.status(200).json({
                ok: true,
                msg: `Contenido ${IdContenido} eliminado`
            })
        })
        .catch(e => {
            res.status(400).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}

module.exports = {
    getContenidos,
    getContenido,
    getContenidosExperiencia,
    postContenido,
    putContenido,
    deleteContenido
}
