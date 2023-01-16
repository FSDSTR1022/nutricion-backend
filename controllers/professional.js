const ProfessionalModel = require('../models/professional')

// GET PROFESSIONALS
const getAllProfessionals = async function (req, res, next) {
    const professional = await ProfessionalModel.find().populate('discipline')
    res.json({ professional })
}

// GET PROFESSIONAL BY ID
const getProfessionalById = async function (req, res, next) {
    const { id } = req.params
    const professional = await ProfessionalModel.findById(id)
    res.json({ professional })
}

// POST PROFESSIONAL
const createProfessional = async function (req, res, next) {

    const newProfessional = new ProfessionalModel()

    newProfessional.dni = req.body.dni
    newProfessional.name = req.body.name
    newProfessional.discipline = req.body.discipline
    newProfessional.admissionDate = req.body.admissionDate
    newProfessional.dropoutDate = req.body.dropoutDate
    newProfessional.email = req.body.email
    newProfessional.phone = req.body.phone
    newProfessional.user = req.body.user
    newProfessional.password = req.body.password
    newProfessional.active = req.body.active
    newProfessional.imgUrl = req.body.imgUrl

    newProfessional.save((err, savedInfo) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.json({ professional: savedInfo })
    })

}

// PUT PROFESSIONAL
const putProfessional = async function (req, res, next) {
    try {
        await ProfessionalModel.findByIdAndUpdate(req.params.id, {
            dni: req.body.dni,
            name: req.body.name,
            discipline: req.body.discipline,
            admissionDate: req.body.admissionDate,
            dropoutDate: req.body.dropoutDate,
            email: req.body.email,
            phone: req.body.phone,
            user: req.body.user,
            password: req.body.password,
            active: req.body.active,
            imgUrl: req.body.imgUrl
        })
        res.send('Professional Updated!')
    }
    catch (err) {
        res.send(400).send('Server Error')
    }
}

// DELETE PROFESSIONAL
const deleteProfessional = async function (req, res, next) {
    try {
        await ProfessionalModel.findByIdAndDelete(req.params.id)
        res.json('Professional deleted!')
    } catch (err) {
        res.send(400).send('Server Error')
    }
}

module.exports = { getAllProfessionals, getProfessionalById, createProfessional, putProfessional, deleteProfessional }
