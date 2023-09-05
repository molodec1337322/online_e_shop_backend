const {Type} = require("../models/models")
const ApiError = require("../error/ApiError")

async function create(req, res){
    const {name} = req.body
    const type = await  Type.create({name})

    return res.json(type)
}

async function getAll(req, res){

}

module.exports = {
    create,
    getAll,
}