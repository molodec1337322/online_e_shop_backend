const {Device} = require("../models/models")
const ApiError = require("../error/ApiError")
const uuid = require("uuid")
const path = require("path")

async function create(req, res, next){

    try {
        const {name, price, brandId, typeId, info} = req.body
        const {img} = req.files

        let fileName = uuid.v4 + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const device = await Device.create({name, price, brandId, typeId, img: fileName})

        return res.json(device)
    }catch (e){
        next(ApiError.badRequest(e.message))
    }
}

async function getAll(req, res){

}

async function getOne(res, req){

}

module.exports = {
    create,
    getAll,
    getOne,
}