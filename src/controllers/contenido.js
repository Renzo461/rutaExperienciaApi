const { request, response } = require('express')
const knex = require('../conexion.js')

const getContenidos = async (req = request, res = response) => {
    try {

        await knex
            .select('*')
            .from('contenido')
            .then(contenidos => {

                // NO SE ENCONTRARON CONTENIDOS
                if (contenidos.length === 0) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'No hay contenidos'
                    })
                }

                // SE ENCONTRARON CONTENIDOS
                return res.status(200).json(contenidos)
            })

    }
    catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })

    }
}

const getContenido = async (req = request, res = response) => {
    try {

        const IdContenido = req.params.IdContenido
        await knex
            .select('*')
            .from('contenido')
            .where('IdContenido', IdContenido)
            .then(([contenido]) => {

                if (!contenido) {
                    // NO SE ENCONTRO EL CONTENIDO
                    return res.status(404).json({
                        ok: false,
                        msg: 'No existe el contenido'
                    })
                }

                // SE ENCONTRO EL CONTENIDO
                return res.status(200).json(contenido)
            })

    }
    catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })

    }
}

const getContenidosExperiencia = async (req = request, res = response) => {
    try {

        const IdExperiencia = req.params.IdExperiencia
        await knex
            .select('*')
            .from('contenido')
            .where('IdExperiencia', IdExperiencia)
            .then(contenidos => {

                // LA EXPERIENCIA NO EXISTE O EN SU DEFECTO ESTA NO TIENE CONTENIDOS
                if (contenidos.length === 0) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Experiencia no existe o no tiene contenidos'
                    })
                }

                // SE ENCOTRO LOS CONTENIDOS DE LA EXPERIENCIA
                return res.status(200).json(contenidos)
            })

    }
    catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })

    }
}

const postContenido = async (req = request, res = response) => {
    try {

        const newContenido = req.body
        await knex
            .insert(newContenido)
            .into("contenido")
            .then(([contenido]) => {

                // SE CREO EXITOSAMENTE EL CONTENIDO
                return res.status(201).json({
                    ok: true,
                    msg: `Se creo el contenido con id ${contenido}`,
                    id: contenido
                })

            })
            .catch((error) => {

                console.log(error)
                res.status(400).json({
                    ok: false,
                    msg: 'No se pudo crear el contenido, Media o Experiencia no existe'
                })

            })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })

    }
}

const putContenido = async (req = request, res = response) => {
    try {

        const IdContenido = req.params.IdContenido
        const contenido = req.body

        await knex('contenido')
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

                // SE EDITO EL CONTENIDO
                return res.status(200).json({
                    ok: true,
                    msg: `Contenido ${IdContenido} editado`
                })

            })
            .catch(e => {

                res.status(400).json({
                    ok: false,
                    msg: 'Media no existe'
                })

            })



    }
    catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })

    }
}

const deleteContenido = async (req = request, res = response) => {
    try {

        const IdContenido = req.params.IdContenido
        await knex('contenido')
            .where("IdContenido", IdContenido)
            .del()
            .then(contenido => {

                // EL CONTENIDO NO EXISTE
                if (!contenido) {
                    return res.status(404).json({
                        ok: false,
                        msg: `Contenido ${IdContenido} no existe`
                    })
                }

                // EL CONTENIDO FUE ELIMINADO
                return res.status(200).json({
                    ok: true,
                    msg: `Contenido ${IdContenido} eliminado`
                })
            })


    }
    catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })

    }
}

module.exports = {
    getContenidos,
    getContenido,
    getContenidosExperiencia,
    postContenido,
    putContenido,
    deleteContenido
}
