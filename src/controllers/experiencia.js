const { request, response } = require('express')
const knex = require('../conexion.js')

const getExperiencias = async (req = request, res = response) => {

    try {

        await knex
            .select('*')
            .from("tblExperiencia")
            .then(experiencias => {

                return res.status(200).json(experiencias)
            })

    }
    catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Por Favor hable con el administrador"
        })

    }
}

const getExperiencia = async (req = request, res = response) => {
    try {
        const IdExperiencia = req.params.id

        await knex
            .select("*")
            .from("tblExperiencia")
            .where('IdExperiencia', IdExperiencia)
            .then(([experiencia]) => {
                if (!experiencia) {
                    return res.status(404).json({
                        ok: false,
                        msg: "No existe esa experiencia"
                    })
                }

                return res.status(200).json(experiencia)
            })
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Por Favor hable con el administrador"
        })
    }
}

const getExperienciasCarrera = async (req = request, res = response) => {
    try {
        const IdCarrera = req.params.IdCarrera
        await knex
            .select("*")
            .from("tblExperiencia")
            .where("IdCarrera", IdCarrera)
            .then(experiencias => {

                return res.status(200).json(experiencias)
            })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Por Favor hable con el administrador"
        })
    }
}

const postExperiencia = async (req = request, res = response) => {
    try {

        const experiencia = req.body
        // SUBIR EXPERIENCIA
        await knex
            .insert(experiencia)
            .into("tblExperiencia")
            .then(([id]) => {
                return res.status(201).json({
                    ok: true,
                    msg: `Experiencia ${id} creada exitosamente`
                });
            })
            .catch((error) => {

                return res.status(400).json({
                    ok: false,
                    msg: 'Error al actualizar la experiencia'
                });
            });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Por Favor hable con el administrador"
        })
    }
}

const putExperiencia = async (req = request, res = response) => {
    try {
        const IdExperiencia = req.params.id
        const experiencia = req.body

        // EDITAR EXPERIENCIA
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


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Por Favor hable con el administrador"
        })
    }
}

const deleteExperiencia = async (req = request, res = response) => {
    try {
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
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Por Favor hable con el administrador"
        })
    }
}

module.exports = {
    getExperiencias,
    getExperiencia,
    getExperienciasCarrera,
    postExperiencia,
    putExperiencia,
    deleteExperiencia
}

//  // OBTENER EL CONTENIDO DE UNA EXPERIENCIA
//  await Promise.all(r.map(async (element, index) => {
//     r[index].contenido = await knex
//         .select("*")
//         .from("contenido")
//         .where("IdExperiencia", element.IdExperiencia)
//         .then(c => c)
// }))
// return r[0]