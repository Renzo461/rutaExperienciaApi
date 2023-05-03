const { request, response } = require('express')
const knex = require('../conexion')

const getBeneficios = (req = request, res = response) => {
    knex
        .select('*')
        .from('tblBeneficio')
        .then(beneficios => {
            return res.status(200).json(beneficios)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}

const getBeneficio = (req = request, res = response) => {

    const IdBeneficio = req.params.id

    knex
        .select('*')
        .from('tblBeneficio')
        .where('IdBeneficio', IdBeneficio)
        .then(([beneficio]) => {
            return res.status(200).json(beneficio)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })
}


const getBeneficiosCarrera = (req = request, res = response) => {

    const IdCarrera = req.params.id

    knex
        .select('*')
        .from('tblBeneficio')
        .where('IdCarrera', IdCarrera)
        .then(beneficios => {   
            return res.status(200).json(beneficios)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })

}

const postBeneficio = (req = request, res = response) => {
                
    const newBeneficio = req.body

    knex
        .insert(newBeneficio)
        .into("tblBeneficio")
        .then(([id]) => {   
            return res.status(201).json({
                ok: true,
                msg: `Se creo el beneficio con id ${id}`,
                id
            })
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'No se pudo crear el beneficio, Carrera no existe'
            })
        })

}

const putBeneficio = (req = request, res = response) => {

    const IdBeneficio = req.params.id
    const editBeneficio = req.body

    knex('tblBeneficio')
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
        .catch(error => {
            console.log(error)
            res.status(400).json({
                ok: false,
                msg: 'Por Favor hable con el administrador'
            })
        })

}

const deleteBeneficio = (req = request, res = response) => {
    const IdBeneficio = req.params.id

    knex('tblBeneficio')
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
    getBeneficios,
    getBeneficio,
    getBeneficiosCarrera,
    postBeneficio,
    putBeneficio,
    deleteBeneficio
}