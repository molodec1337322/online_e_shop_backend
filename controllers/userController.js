const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const {User, Basket} = require('../models/models')
const jwt = require("jsonwebtoken")

function generateToken(id, email, role){
    return jwt.sign({
        id: id,
        email: email,
        role: role
    },
        process.env.SECRET_KEY,
        {
        expiresIn: '24h'
    })
}

async function registration(req, res, next){
    const {email, password, role} = req.body
    if(!email || !password){
        return next(ApiError.badRequest("Некорректный догин или пароль"))
    }
    const candidate = await User.findOne({where: {email}})
    if(candidate){
        return next(ApiError.badRequest("Пользователь с таким Email уже существует"))
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password: hashedPassword})
    const basket = await Basket.create({userId: user.id})
    let token = generateToken(user.id, email, role)
    token = "Bearer " + token
    return res.json({token: jwtToken})
}

async function login(req, res, next){
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if(!user){
        return next(ApiError.badRequest("Email или пароль указаны неверно"))
    }

    let isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if(!isPasswordCorrect){
        return next(ApiError.badRequest("Email или пароль указаны неверно"))
    }
    let token = generateToken(user.id, user.mail, user.role)
    token = "Bearer " + token
    return res.json({token: token})
}

async function check(req, res, next){

}

module.exports = {
    registration,
    login,
    check,
}