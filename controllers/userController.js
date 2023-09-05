const ApiError = require("../error/ApiError")

async function registration(req, res){

}

async function login(req, res){

}

async function check(req, res, next){
    const {id} = req.query
    if(!id){
        return next(ApiError.badRequest("no id"))
    }
    res.json('dsgsdgsfdg')
}

module.exports = {
    registration,
    login,
    check,
}