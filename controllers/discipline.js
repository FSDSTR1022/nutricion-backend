const DisciplineModel = require('../models/discipline')

// GET DISCIPLINES
const getAllDisciplines = async function (req, res, next) {
    const discipline = await DisciplineModel.find()
    res.json({ discipline })
}

// GET DISCIPLINE BY ID
const getDisciplineById = async function (req, res, next) {
    const { id } = req.params
    const discipline = await DisciplineModel.findById(id)
    res.json({ discipline })
}

// POST DISCIPLINE
const createDiscipline = async function (req, res, next) {

    const newDiscipline = new DisciplineModel()

    newDiscipline.name = req.body.name

    newDiscipline.save((err, savedInfo) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.json({ discipline: savedInfo })
    })

}

// PUT DISCIPLINE
const putDiscipline = async function (req, res, next) {
    try {
        await DisciplineModel.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        })
        res.send('Discipline Updated!')
    }
    catch (err) {
        res.send(400).send('Server Error')
    }
}

// DELETE DISCIPLINE
const deleteDiscipline = async function (req, res, next) {
    try {
        await DisciplineModel.findByIdAndDelete(req.params.id)
        res.json('Discipline deleted!')
    } catch (err) {
        res.send(400).send('Server Error')
    }
}

module.exports = { getAllDisciplines, getDisciplineById, createDiscipline, putDiscipline, deleteDiscipline }
