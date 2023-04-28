const { request, response } = require('express')
const knex = require('../conexion')

const getCarreras = (req = request, res = response) => {

    knex
        .select('*')
        .from('carrera')
        .then(carreras => {

            if (carreras.length === 0) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No hay carreras'
                })
            }

            return res.status(200).json(carreras)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })

}

const getCarrera = (req = request, res = response) => {

    const IdCarrera = req.params.id
    knex
        .select('*')
        .from('carrera')
        .where('IdCarrera', IdCarrera)
        .then(([carrera]) => {

            if (!carrera) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe la carrera'
                })
            }

            return res.status(200).json(carrera)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}

const postCarrera = (req = request, res = response) => {

    const newBeneficio = req.body
    knex
        .insert(newBeneficio)
        .into("beneficio")
        .then(([beneficio]) => {

            return res.status(201).json({
                ok: true,
                msg: `Se creo el beneficio con id ${beneficio}`,
                id: beneficio
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'No se pudo crear el beneficio, Carrera no existe'
            })
        })

}

const putCarrera = (req = request, res = response) => {

    const IdBeneficio = req.params.id
    const editBeneficio = req.body
    knex('beneficio')
        .where("IdBeneficio", IdBeneficio)
        .update(editBeneficio)
        .then((beneficio) => {

            if (!beneficio) {
                return res.status(400).json({
                    ok: false,
                    msg: `Beneficio ${IdBeneficio} no existe`
                })
            }

            return res.status(200).json({
                ok: true,
                msg: `Beneficio ${IdBeneficio} editado`
            })


        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })

}

const deleteCarrera = (req = request, res = response) => {
    const IdBeneficio = req.params.id
    knex('beneficio')
        .where("IdBeneficio", IdBeneficio)
        .del()
        .then((beneficio) => {

            if (!beneficio) {
                return res.status(400).json({
                    ok: false,
                    msg: `Beneficio ${IdBeneficio} no existe`
                })
            }

            return res.status(200).json({
                ok: true,
                msg: `Beneficio ${IdBeneficio} eliminado`
            })


        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}

module.exports = {
    getCarreras,
    getCarrera,
    postCarrera,
    putCarrera,
    deleteCarrera
}