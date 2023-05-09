const { request, response } = require('express')
const connection = require('../conexion')

const getExperiencias = (req = request, res = response) => {

    const knex = require('knex')(connection)

    knex
        .select('*')
        .from("tblExperiencia")
        .then(experiencias => {
            return res.status(200).json(experiencias)
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: "Por Favor hable con el administrador"
            })
        })
        .finally(() => {
            knex.destroy();
        })
}

const getExperiencia = async (req = request, res = response) => {

    const knex = require('knex')(connection)

    const IdExperiencia = req.params.id

    await knex
        .select("*")
        .from("tblExperiencia")
        .where('IdExperiencia', IdExperiencia)
        .then(([experiencia]) => {
            return res.status(200).json(experiencia)
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: "Por Favor hable con el administrador"
            })
        })
        .finally(() => {
            knex.destroy();
        })
}

const getExperienciasCarrera = async (req = request, res = response) => {

    const knex = require('knex')(connection)

    const IdCarrera = req.params.IdCarrera    

    await knex
        .select("*")
        .from("tblExperiencia")
        .where("IdCarrera", IdCarrera)
        .then(experiencias => {
            return res.status(200).json(experiencias)
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: "Por Favor hable con el administrador"
            })
        })
        .finally(() => {
            knex.destroy();
        })
}

const postExperiencia = async (req = request, res = response) => {

    const knex = require('knex')(connection)

    const experiencia = req.body

    await knex
        .insert(experiencia)
        .into("tblExperiencia")
        .then(([id]) => {
            return res.status(201).json({
                ok: true,
                msg: `Experiencia ${id} creada exitosamente`,
                id
            });
        })
        .catch((error) => {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: "Por Favor hable con el administrador"
            })
        })
        .finally(() => {
            knex.destroy();
        })

}

const putExperiencia = async (req = request, res = response) => {

    const knex = require('knex')(connection)

    const IdExperiencia = req.params.id
    const experiencia = req.body

    await knex('tblExperiencia')
        .where("IdExperiencia", IdExperiencia)
        .update(experiencia)
        .then(r => {
            if (!r) {
                return res.status(404).json({
                    ok: false,
                    msg: `No existe la experiencia ${IdExperiencia}`,
                })
            }

            return res.status(200).json({
                ok: true,
                msg: `Experiencia ${IdExperiencia} editada`,
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: "Por Favor hable con el administrador"
            })
        })
        .finally(() => {
            knex.destroy();
        })
}

const deleteExperiencia = async (req = request, res = response) => {

    const knex = require('knex')(connection)

    const IdExperiencia = req.params.id

    await knex('tblExperiencia')
        .where("IdExperiencia", IdExperiencia)
        .del()
        .then((experiencia) => {
            if (!experiencia) {
                return res.status(404).json({
                    ok: false,
                    msg: `Experiencia ${IdExperiencia} no existe`
                })
            }

            return res.status(200).json({
                ok: true,
                msg: `Experiencia ${IdExperiencia} eliminado`
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: "Por Favor hable con el administrador"
            })
        })
        .finally(() => {
            knex.destroy();
        })
}

module.exports = {
    getExperiencias,
    getExperiencia,
    getExperienciasCarrera,
    postExperiencia,
    putExperiencia,
    deleteExperiencia
}
